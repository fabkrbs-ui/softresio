from glob import glob
import json


items = []

for file in glob("*.json"):
    items = items + json.loads(open(file).read())["items"]

types = set()
slots = set()

for item in items:
    types.add(item["type"])
    slots.add(item["slot"])


print("{")
for s in slots:
    print(f'"{s}": [')
    types = set()
    for item in items:
        if item["slot"] == s:
            types.add(item["type"])
    for typ in types:
        print(f'  "{typ}",')
    print("],")
print("}")
