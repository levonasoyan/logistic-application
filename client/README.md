# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



###### TODO: Need add description of module and it's API

## FMS Common services
Module name: FMS Common Sevice - FMSCS ( gateway base url: /api/v1/fmscs/ )
Provides functionality for common FMS data (like jobs)
Data is returned in format:
```
{
	Ok: true | false,
	message: <Message>.
	data: { <List of projects> }
}
```	

### Startup application
In order to run application follow next steps:
* Install project dependencies running ```npm install``` command
* create .env file from .env.template and set environment variable
* start application ```npm run start```

#### Routes information
* API for getting project details, searching by Job number:

```/api/v1/fmscs/<database>/projects?jobNo=<FMS Job number>```

* API for getting project details, searching by id:

```/api/v1/fmscs/<database>/projects?wardProjectId=<FMS ward project id>```

* API for setting FMS project/job/load number:

```/api/v1/fmscs/<database>/sequences/next/:type/:id?date=<ISO project/job/load date>```
Where:
:id => id number of newly created record where sequence should be set 
:type => type of entity for which sequence is setting. Possible values are:
tt_load - for Track & Trace loads
tt_order - for Track & Trace orders
wp - for FMS jobs ( old job version )
fms_prj - for FMS current projects

#### Examples (cURL):


Note: in examples below is using base url format for sending request through gateway service that is running on localhost:6999


##### Project details
```
// GET list of project details
// Searching by job number  
curl "http://localhost:6999/api/v1/fmscs/mwcz/projects?jobNo=CZ2100"

// Searching by job id ( ward_project.ward_project_id column )  
curl "http://localhost:6999/api/v1/fmscs/mwcz/projects?wardProjectId=162238"
```

Returned project data contains next information:
- wardProjectId - database id of job/project
- jobNo - FMS job number
- mawb - FMS MAWB (master way bill) number
- hawb - FMS HAWB (house way bill) number
- origin - origin country name 
- originCode - origin country code
- destination - destination country name
- destinationCode - destination country code
- handledBy - name of person who handling job/project
- reference - project's reference 


*NOTES*:
1) Search with jobNo parameter on backend is done with ILIKE '%[data from request]%'
2) Search with jobNumber is searching for pattern in ward_project.job_no | ward_project.mawb | ward_project.reference fields, so either value could be provided in request query.

##### Setting Project/job/load/order sequence number
```
// PATCH request for setting job number for job with id = 12345 and date = 2022-02-05
curl "http://localhost:6999/api/v1/fmscs/mwcz/sequences/next/wp/12345?date=2022-02-05"

// PATCH request for setting sequence number for Track & Trace Load with id = 12345 and date = 2021-12-15
curl "http://localhost:6999/api/v1/fmscs/mwcz/sequences/next/tt_load/12345?date=2022-02-05"
```