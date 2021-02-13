# ChangeLogSystem

ChangeLogSystem POC
*******************

Project structure
********************

changeLogsystem

    1. ChangeLogSystem(API Project)
    
        1.a. Client App(Angular Project)
        
    2. LogView (MVC Prjoect)    

To Run Web API
**************
 1). Project has been developed using code-frst development entity framework. Please provide your DB connection string at AppSettings.JSON
 2). Maker sure all the dependent nuget packages are installed before start build.
 3) Once is ready, Run this API project. It will open swagger page to test API methods.
 
 To Run Angular
 **************
 1). Open the project clientApp which is placed inside ChangeLogSystem API prject at Visual studio code.
 2). Install/Update Node modules in the project. Node modules are not included in the repsoitory due to heavy volume. So please install them.
 3). Provide your Facebook and Google client Id at environment TS file to work with social login functionality. We have been used angularx-social-login module to acheive it.
 4). Please googled it to register out app at google and facebook signOn functionality with our project.
 5). User ng serve to run the project locally and it will be open at http://localhost:4200. This will open sign in page. Please register yourself by navigating to signup page.
 6). Once user logged-in, there is add updates button at top-right end. Please click button to add updates. It will open modal and enter required info, This will be saved and refresh home page to list out newly added updates.
 
 To Run MVC Project
 ********************
 1). Project has been developed using DB-first entity framework. Please provide your DB connection string at AppSetting.JSON
 2). Make sure all the dependtent nuget packages are installed before start build.
 
