const core = require("@actions/core");
const { HttpClient } = require("@actions/http-client");

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

async function run() {
  const options = inputs.reduce((res, k) => {
    res[k] = core.getInput(k);
    return res;
  }, {});
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
    const httpClient = new HttpClient("Github Action");
    const res = await httpClient.postJson(wxPusherUrl, {
      appToken,
      summary: encodeURIComponent(summary),
      content,
      topicIds,
      uids,
      contentType,
      url,
    });
    core.setOutput("response", res.result);
    //=> 'https://cats.com/unicorn'
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
