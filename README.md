
# Ejob
ejob is a web app that manages printing job developed with dotnet core and angular

## Used stack
- dotnet core 2.2 for back end
- angular 7.2 for frontend
- MySQL 9.4
## How to run
In a terminale write the follow commands
Clone the project

```bash
git clone https://github.com/elhosayny/mini-ejob.git
```

Make sure to have dotnet cli installed to follow this steps.

**Build the backend**

```bash
cd mini-ejob
dotnet build
```
**Build the frontend**

```bash
cd EJob\Client
ng build
```
**Setting up the database**

change the MySQL credentials in the file **appsettings.json** the database is generated automatically with Entity Framework

**Run the app**
```bash
cd ..
dotnet run
```
You will get a message like that one, access the link shown in the command prompt
```
Hosting environment: Development
Content root path: E:\Project_C_sharp\EJob\EJob
Now listening on: https://localhost:5001
Now listening on: http://localhost:5000
```

## Message for recruiters 

This project is not complete yet but I think it has all the necessary code to evaluate my programming skills I will keep improving and sending changes every day.