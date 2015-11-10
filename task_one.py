import requests
import json

#Here we are making a "GET" request to the server to pull down a json file
r = requests.get("https://s3.amazonaws.com/interview-api-samples/events-results.json")

#here we are loading the json file from a string into a native json object
dicter = json.loads(r.text) #json loads the string into memory as a dictionary (or in javascript as an object)
#print dicter["events"]
json.dump(dicter["events"],open("events.json","w")) #finally we dump out to a file, but only the events as requested

