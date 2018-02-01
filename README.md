![Logo of the project](./public/client/css/venariLogo.png)


# Venari

Venari is a scavenger hunt app that uses photo recognition and geo location to verify item submissions. Our hunters (users) participate in scavenger hunts by taking pictures of the items specified for the challenge. Hunters earn points for each item submitted and challenge completed, and earn a badge for completing a challenge. Hunters can also create and share their own challenges. 

## Getting Started

```
npm install
```

### Prerequisites

What things you need to install the software and how to install them

```
node 8.8.1
```

### Installing

You will need a .env file with these variables:
- port: the port to run the server
- FBAPPID: the id of the app registered with facebook
- FBAPPSECRET: the secret for the app registered with facebook
- db_uri: a database connection uri for your database
- WATSONKEY: an api key for IBM Watson
- GOOGLEKEY: a google api key with geocoding permissions

*first 

    $npm install


To get the Webpack to bundle files and continue watching for changes

    $npm run dev

*in another terminal

To get the server started and running

    $npm start

Now, go to localhost at the port specified and you should see the site

## To Run the Tests

    $npm test

## Deployment

Add additional notes about how to deploy this on a live system

You can use DigitalOcean, AWS (which we used), or another deployment service to deploy this. 

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-launch-instance

Above is a tutorial on how to deploy through AWS.

## Built With

* [React](https://reactjs.org/docs) - The web framework used
* [NPM](https://docs.npmjs.com/) - Dependency Management
* [Webpack](https://webpack.js.org/concepts//) - Used to complile files

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Nicole Creshon** - *Software Engineer* - [BlackAndWhiteRainbows](https://github.com/BlackAndWhiteRainbows)
* **Ryan Diaz** - *Product Owner* - [BlackAndWhiteRainbows](https://github.com/BlackAndWhiteRainbows)
* **Paul Soniat** - *Scrum Master* - [BlackAndWhiteRainbows](https://github.com/BlackAndWhiteRainbows)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Operation Spark
