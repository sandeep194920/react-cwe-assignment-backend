#### About

Endpoint deployed here [`http://cwe-node-app-env.eba-pbj4dp9b.ca-central-1.elasticbeanstalk.com/contributions`](http://cwe-node-app-env.eba-pbj4dp9b.ca-central-1.elasticbeanstalk.com/contributions) onto AWS Elastic Block store.

This is a `Node.js` app built with `Express` and `MongoDB` to GET, POST and DELETE contributions' data. In order to test the app locally,

1. Use `node 18` version.
2. Run `npm install`.
3. Create a `.env` file in your local and `mongo_uri={URI OF THE DB}`. I can share the URI of the DB with you on email.
4. Navigate to [http://localhost:8000/contributions/](http://localhost:8000/contributions/) to make a GET call, and you should see the list of contributions in your browser. For prod, navigate to [http://cwe-node-app-env.eba-pbj4dp9b.ca-central-1.elasticbeanstalk.com/contributions](http://cwe-node-app-env.eba-pbj4dp9b.ca-central-1.elasticbeanstalk.com/contributions)

##### Test on POSTMAN

1. Once you follow above steps, launch your postman app.
2. Import the `CommonWealth.postman_collection.json`(for local), and `CommonWealth(master).postman_collection.json`(for master) file placed at the top level of this repo.
3. You can then make the following calls:

- `GET` call to get the data.
- `POST` call to create new data from scratch. This is helpful if you want to hydrate your front-end with data to test it.
- `DELETE` call to delete the data by passing specific uuid in the query.

_[Frontend of this site is here](https://github.com/sandeep194920/react-cwe-assignment/blob/develop/TODO.md)_
