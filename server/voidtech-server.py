from flask import Flask
from flask import request
import datetime

app = Flask(__name__)

STATISTICS_FILENAME = "voidtech-statistics.txt"

@app.route('/submit-statistics', methods=['POST'])
def hello_world():
    content = request.get_json()
    desition = content["desition"]

    saveNewStatisticsLine(desition)

    result = calculateStatisticsObject()

    return result

def saveNewStatisticsLine(desition):
    timestamp = datetime.datetime.utcnow().isoformat()
    newStatiticsEntry = timestamp + " " + str(desition) + "\n"
    file = open(STATISTICS_FILENAME, "a") 
    file.write(newStatiticsEntry)
    file.close() 
    print(newStatiticsEntry)

def calculateStatisticsObject():
    file = open(STATISTICS_FILENAME, "r") 
    statistics = file.readlines()
    file.close()

    resultObject = {}
    for line in statistics:
        desition = line.strip().split(" ")[1]
        if not desition in resultObject:
            resultObject[desition] = 1
        else:
            resultObject[desition] += 1

    return resultObject

if __name__ == '__main__':
    app.run(
        host="0.0.0.0",
        port=5000
    )