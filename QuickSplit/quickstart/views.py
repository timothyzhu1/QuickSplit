from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import  APIView
from rest_framework.response import Response
from rest_framework import status
from pymongo import MongoClient
from rest_framework.decorators import api_view




# Create your views here.
client = MongoClient("mongodb+srv://godugur:zxcvbnm123@cluster0-inii1.mongodb.net/test?retryWrites=true&w=majority")
loginDb = client.get_database('LoginDB')
userPassCollections = loginDb.UserPass


@api_view(('GET',))
def signIn(request, username, password):
    singledict = userPassCollections.find_one({"username": username})
    if(singledict!=None and singledict["password"]==password):
        res = "Y"
    else:
        res = "N"
    print('LOG: signIn:', res)
    return Response(res)

@api_view(('GET',))
def signUp(request, username, password):
    singledict = userPassCollections.find_one({"username": username})
    if(singledict!=None):
        res = "N"
    else:
        res = "Y"
        newDoc = {"username" :username, "password" : password, "groups":[], "givenGroupNames": []}
        userPassCollections.insert_one(newDoc)
    print('LOG: signUp:', res)
    return Response(res)

@api_view(('GET',))
def createGroup(request, username, groupName):
    singleDict = userPassCollections.find_one({"username": username})
    groupNum = userPassCollections.find_one({"globals": "Y"})["numgroups"] 

    if groupName not in singleDict["givenGroupNames"]:
        res = "Y"
        loginDb.create_collection(str(groupNum+1))
        
        newEntry = {"globals": "Y", # the initialization of the new group
        "groupMembers": [username], 
        "groupName": groupName, 
        "groupID": groupNum + 1001} 

        loginDb[(str(groupNum+1))].insert_one(newEntry)
        userPassCollections.update_one({"numgroups": groupNum}, {"$set":{"numgroups":(groupNum+1)}}) # increment the global numgroups by 1
        userPassCollections.update_one({"username": username}, {"$set":{"groups": singleDict["groups"]+[str(groupNum+1)]}})
        userPassCollections.update_one({"username": username}, {"$set":{"givenGroupNames": singleDict["givenGroupNames"]+[groupName]}})

    else: # the user is already in a group with the same name
        res = "N"

    return Response(res)


@api_view(('GET',))
def joinGroup(request, username, groupID):
    singleDict = userPassCollections.find_one({"username": username}) # entry of the user
    groupNum = userPassCollections.find_one({"globals": "Y"})["numgroups"] # how many groups there are
    groupIdArray =singleDict["groups"] # list of groups that the user is in

    # add the group number to the list of groups that the user has access to ("groups")
    if (int(groupID) - 1000) > groupNum:
        return Response("D")

    # add the givengroupname to the user's array "givenGroupName" 
    for i in groupIdArray:
        if (str(int(groupID) - 1000)) == i:
            return Response("N")
    
    # add the username to the group's "groupMembers"
    givenGroupNameOfTheGroupId = loginDb[str(int(groupID)-1000)].find_one({"globals": "Y"})["groupName"] # var name is self explanatory
    if givenGroupNameOfTheGroupId not in singleDict["givenGroupNames"]:
        userPassCollections.update_one({"username": username}, {"$set":{"givenGroupNames": singleDict["givenGroupNames"] + [givenGroupNameOfTheGroupId]}})
    else:
        return Response("F")
    userPassCollections.update_one({"username": username}, {"$set":{"groups": singleDict["groups"] + [str(int(groupID)-1000)]}})
    loginDb[str(int(groupID)-1000)].update_one({"globals": "Y"}, {"$set":{"groupMembers": loginDb[str(int(groupID)-1000)].find_one({"globals": "Y"})["groupMembers"]+[username]}})
    return Response("Y")

@api_view(('GET',))
def getGroupNames(request, username):
    res = userPassCollections.find_one({"username":username})["givenGroupNames"] 
    resJ = {"groupNames":res}
    return Response(resJ)
    
@api_view(('GET',))
def addItem(request, username, groupID, itemName):
    res = "N"
    numberOfGroups = userPassCollections.find_one({"globals": "Y"})["numgroups"]
    for i in range(0, numberOfGroups):
        if(loginDb[str(i)].find_one({"globals":"Y"})!=None):
            groupCollection = loginDb[str(i)]
            foundID = groupCollection.find_one({"globals":"Y"})["groupID"]
            if(foundID == int(groupID)):
                item = {"itemName":itemName, "addedBy" : username}
                groupCollection.insert_one(item)
                res = "Y"
    return Response(res)

@api_view(('GET',))
def deleteItem(request, groupID, itemName):
    res = "N"
    numberOfGroups = userPassCollections.find_one({"globals": "Y"})["numgroups"]
    for i in range(0, numberOfGroups):
        if(loginDb[str(i)].find_one({"globals":"Y"})!=None):
            groupCollection = loginDb[str(i)]
            foundID = groupCollection.find_one({"globals":"Y"})["groupID"]
            if(foundID == int(groupID)):
                item = {"itemName":itemName}
                groupCollection.delete_one(item)
                res = "Y"

    return Response(res)

@api_view(('GET',))
def getItems(request, groupID):
    res = "N"
    numberOfGroups = userPassCollections.find_one({"globals": "Y"})["numgroups"]


    for i in range(0, numberOfGroups):
        if(loginDb[str(i)].find_one({"globals":"Y"})!=None):
            groupCollection = loginDb[str(i)]
            foundID = groupCollection.find_one({"globals":"Y"})["groupID"]
            items = []
            if(foundID == int(groupID)):
                for item in groupCollection.find({"globals":{"$ne":"Y"}}):
                      items.append(str(item))
                res = items

    return Response(res)

@api_view(('GET',))
def leaveGroup(request, username, groupID):  
    singleDict = userPassCollections.find_one({"username": username}) # entry of the user
    groupNum = userPassCollections.find_one({"globals": "Y"})["numgroups"] # how many groups there are
    groupIdArray =singleDict["groups"] # list of groups that the user is in

    # check if the user is in the group
    if str(int(groupID) - 1000) not in groupIdArray:
        return Response("N") 
    
    givenGroupNameOfTheGroupId = loginDb[str(int(groupID)-1000)].find_one({"globals": "Y"})["groupName"] # var name is self explanatory
   
    # remove groupName from the user's givenGroupName array
    temp = singleDict["givenGroupNames"]
    temp.remove(givenGroupNameOfTheGroupId)
    userPassCollections.update_one({"username": username}, {"$set":{"givenGroupNames": temp}})

    # remove the groupID from the user's groups array
    temp = singleDict["groups"]
    temp.remove(str(int(groupID)-1000))
    userPassCollections.update_one({"username": username}, {"$set":{"groups": temp}})

    # remove username from the group's groupMember's array
    temp = loginDb[str(int(groupID)-1000)].find_one({"globals": "Y"})["groupMembers"]
    temp.remove(username)
    loginDb[str(int(groupID)-1000)].update_one({"globals": "Y"}, {"$set":{"groupMembers": temp}})

    #also, if the group is empty after the removal, delete the group
    return Response("Y")  


####################### DEBUG FUNCTIONS BELOW ###########################
@api_view(('GET',))
def DEBUG_resetUserPassCollection(request):
    userPassCollections.delete_many({})
    userPassCollections.insert_one({"globals":"Y", "numgroups":0})
    return Response("Y")