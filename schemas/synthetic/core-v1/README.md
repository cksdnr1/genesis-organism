# Synthetic core-v1 schemas

Accepted D03–D06 define the actual contracts. These four Draft 2020-12 schemas
check shape, not canonical wire bytes, UTF-8 byte budgets, signatures, authority,
ordering, duplication, conflict or state transitions. maxLength is a character
constraint; the runtime must additionally enforce D03/D04 UTF-8 byte limits.
JSON Schema's mathematical integer handling does not reject the raw token `1.0`;
D03's canonical-byte boundary must reject it separately.

Distinct schema IDs do not change the two historical 0.1-experimental descriptors.
All fixtures are synthetic; no actual organism exists or is born by validation.
