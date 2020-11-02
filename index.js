const core = require("@actions/core");
const got = require("got");

const options = {
  appToken: core.getInput("appToken"),
};

const inputs = [
  "appToken",
  "content",
  "summary",
  "contentType",
  "topicIds",
  "uids",
  "url",
  "wxPusherUrl",
];

const options = inputs.map((k) => core.getInput(k));

async function run() {
  try {
    await got("unicorn", {
      prefixUrl: "http://wxpusher.zjiecode.com/api/send/message/",
    });
    //=> 'https://cats.com/unicorn'
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
