const core = require("@actions/core");
const got = require("got");

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
  if (!options.appToken) {
    core.setFailed("缺少 appToken");
    return;
  }
  if (!options.topicIds && !options.uids) {
    core.setFailed("缺少 topicIds 或 uids");
    return;
  }
  const { appToken, summary, content, contentType, url, wxPusherUrl } = options;
  const topicIds = options.topicIds.split(/[,，]/);
  const uids = options.uids.split(/[,，]/);
  try {
    const res = await got.post(wxPusherUrl, {
      json: {
        appToken,
        summary: encodeURIComponent(summary),
        content,
        topicIds,
        uids,
        contentType,
        url,
      },
    });
    core.setOutput("response", res);
    //=> 'https://cats.com/unicorn'
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
