# Serverless DynamoDB Stream Example

This is a bare-bones [Serverless](http://serverless.com) project that simply shows how to:

1. Give your Lamdbas DynamoDB IAM roles so they can process DynamoDB Streams 
2. Use Serverless's `resources deploy` to instruct CloudFormation to create a DynamoDB Table with a Stream (of StreamViewType `NEW_AND_OLD_IMAGES`) in your stages
3. Capture the ARN of the Stream attached to the DynamoDB Tables created in Step 2 into your project variables per stage
4. Set your Lamdba's trigger event to be the DynamoDB stream events for the table created in the stage you deploy to

## Getting Started

__1. Install Serverless__

`npm install -g serverless`

__2. Setup your AWS Credentials__

Follow the [official guide](http://docs.serverless.com/docs/configuring-aws) here.

__3. (optional) Customize Your Resources/Set up your Stage__

This is just a sample to show how to link up the moving pieces. 
You'll probably want to edit the name of your DynamoDB table,
possibly the type of DynamoDB Stream you want associated with the table, 
the provisioned throughput of the tables, and the name of the output
variable for your project inside `s-resources-cf.json`. You can 
create many DynamoDB tables following the same pattern in the same
`s-resources-cf.json`, just add more entries.

You're also obviously going to have your own function you want to
run in response to a DynamoDB event. The sample function `processStreamEvent`
simply logs the event it receives to the console so you can see it
in CloudWatch. The only important part about the sample function is
the event configuration in `processStreamEvent/s-function.json`.

__4. Deploy Resources__

`sls resources deploy`

__5. Deploy Function & Event__

`sls dash deploy` then deploy everything to the stage you want.

## Testing

Log into the AWS Console (website), navigate to your DynamoDB table and insert
an item in the table you created. Go to CloudWatch and in a few moments 
(possibly a couple minutes if your Lambda hasn't been run in the last 10 minutes
and is cold), you should see the event output in your Logs.

You'll find the info you want under the `event.dynamodb` object.

## Learning

If you're trying to figure out what all the different pieces that have been added
compared to a freshly generated Serverless project, simply follow the git commit
history, it explains what's happening step by step.

## Notes

If you're in your AWS Console, looking at your Lambda function, keep in mind
that you will only see the DynamoDB event source configured when you click on
the tagged version of your function that has the same name as the `stage` you
deployed into. (For example, you need to click on the blue tag named `dev` if
you created a stage called `dev`.) __And__, it's `State` should be set to `Enabled`.

## Questions / Issues?

Open an issue on this repo or hit up @ianserlin on the serverless/serverless gitter.

This code sample is provided by [Useful IO](http://useful.io), because we :heart: Serverless.

We're a distributed software development team and build world-class apps for web and mobile using Meteor and Serverless.

If you'd like to build something useful using Serverless just shoot an email projects@useful.io.