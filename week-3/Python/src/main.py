import urllib.request as rq
import json
import csv 

src = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
with rq.urlopen(src) as response:
    data = json.load(response)
data = data["result"]["results"]

# data processing
result = []
for d in data: 
    if int(d["xpostDate"][0:4]) >= 2015: 
        url = str.lower(d["file"]).split("jpg")
        result.append([d["stitle"]+","+d["address"][5:8]+","+d["longitude"]+","+d["latitude"]+","+url[0]+'jpg'])

# save file
with open("data.csv", "w", encoding="utf-8-sig", newline="") as file:
    writer = csv.writer(file, delimiter=',')
    writer.writerows(result) 