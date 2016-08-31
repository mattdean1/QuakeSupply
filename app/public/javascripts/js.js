function alert_lillyfit(){
  sweetAlert("LillyFit Assessment", "The application is a good candidate for on-premise PaaS according to the LillyFit evaluation");
};
function alert_groups(){
  sweetAlert({
    title: "Security Groups",
    text: 'Create groups in <a href="">Group Manager</a> for: <ul style="list-style:disc inside none"><li>Project Admins</li><li>Project Developers</li><li>Application Promotion</li></ul>',
    html: true
  });
};
function alert_github(){
  sweetAlert({
    title: "GitHub Repository",
    text: 'Create a GitHub repository to store your code using <a href="https://lilly.service-now.com/ess/view_content_search.do?v=1&uri=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3D31a9e3070fe792005200a218b1050ed3%26sysparm_link_parent%3D6313147a3553f00014379b119de0702d%26sysparm_catalog%3De0d08b13c3330100c8b837659bba8fb4&sysparm_document_key=sc_cat_item,31a9e3070fe792005200a218b1050ed3">this</a> ServiceNow request. <br> You can request access for team members using the same form.',
    html: true
  });
};
function alert_nexus(){
  sweetAlert({
    title: "Nexus Account",
    text: 'Create a Nexus account via <a href="https://lilly.service-now.com/ess/view_content_search.do?v=1&uri=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3D4d08112ba9675104182e9e411739aba9%26sysparm_link_parent%3D98dab6526f431500fe289be44b3ee48b%26sysparm_catalog%3De0d08b13c3330100c8b837659bba8fb4&sysparm_document_key=sc_cat_item,4d08112ba9675104182e9e411739aba9">this</a> ServiceNow request. <br>',
    html: true
  });
};
