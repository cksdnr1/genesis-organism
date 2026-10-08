"""Local successor structural checks, independent of JS runtime; not reducer conformance."""
import copy
import json
from pathlib import Path
import unittest
from jsonschema import Draft202012Validator
from referencing import Registry, Resource

ROOT = Path(__file__).resolve().parents[1]


class Successors(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.schemas = {}
        registry = Registry()
        for profile in ("core-v1", "encounter-v1", "adaptation-v1"):
            for filename in (ROOT / f"schemas/synthetic/{profile}").glob("*.schema.json"):
                schema = json.loads(filename.read_text())
                Draft202012Validator.check_schema(schema)
                cls.schemas[(profile, filename.stem.removesuffix(".schema"))] = schema
                registry = registry.with_resource(schema["$id"], Resource.from_contents(schema))
        cls.registry = registry

    def validator(self, profile, name):
        return Draft202012Validator(self.schemas[(profile, name)], registry=self.registry)

    def test_successor_positive(self):
        for profile, count in (("encounter-v1", 1), ("adaptation-v1", 4)):
            directory = ROOT / f"fixtures/{profile}"
            self.validator(profile, "origin").validate(json.loads((directory / "origin.json").read_text()))
            for i in range(1, count + 1):
                event = json.loads((directory / f"{i:06}.json").read_text())
                self.validator(profile, "event").validate(event)
                self.validator(profile, "evidence").validate(event["body"]["data"]["evidence"])

    def test_closed_and_historical_rule_negatives(self):
        directory = ROOT / "fixtures/adaptation-v1"
        event = json.loads((directory / "000001.json").read_text())
        for mutate in (lambda value: value["body"].update(extra=True),
                       lambda value: value["body"]["data"]["evidence"]["sourceState"].update(rules="encounter-v1"),
                       lambda value: value["body"].update(kind="signal-v1", data={"value": 2})):
            invalid = copy.deepcopy(event)
            mutate(invalid)
            self.assertFalse(self.validator("adaptation-v1", "event").is_valid(invalid))
        self.assertFalse(self.validator("encounter-v1", "event").is_valid(event))


if __name__ == "__main__":
    unittest.main()
