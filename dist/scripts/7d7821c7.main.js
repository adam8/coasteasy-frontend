function slugify(a){return a.toString().toLowerCase().replace(/\s+/g,"-").replace(/\:+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").trim()}function randomStr(a){for(var b="",c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",d=0;a>d;d++)b+=c.charAt(Math.floor(Math.random()*c.length));return b}function hideMenus(){null!==document.getElementById("whatever-menu")&&document.getElementById("whatever-menu").classList.remove("menu-show")}var isLocalHost=!1;"localhost"==document.location.hostname&&(isLocalHost=!0);var Router=ReactRouter,Route=Router.Route,Link=Router.Link,DefaultRoute=Router.DefaultRoute,Navigation=Router.Navigation,RouteHandler=Router.RouteHandler,PropTypes=React.PropTypes,docCookies={getItem:function(a){return a?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(a,b,c,d,e,f){if(!a||/^(?:expires|max\-age|path|domain|secure)$/i.test(a))return!1;var g="";if(c)switch(c.constructor){case Number:g=c===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+c;break;case String:g="; expires="+c;break;case Date:g="; expires="+c.toUTCString()}return document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+g+(e?"; domain="+e:"")+(d?"; path="+d:"")+(f?"; secure":""),!0},removeItem:function(a,b,c){return this.hasItem(a)?(document.cookie=encodeURIComponent(a)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(c?"; domain="+c:"")+(b?"; path="+b:""),!0):!1},hasItem:function(a){return a?new RegExp("(?:^|;\\s*)"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie):!1},keys:function(){for(var a=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),b=a.length,c=0;b>c;c++)a[c]=decodeURIComponent(a[c]);return a}},LoginButton=React.createClass({displayName:"LoginButton",mixins:[Router.State,Navigation],handleShowLogin:function(a){a.preventDefault(),a.stopPropagation(),this.transitionTo("/login")},render:function(){return"login"!==this.props.currentPage?React.createElement("div",{id:"login"},React.createElement("div",{className:"pure-button",id:"login-show",onClick:this.handleShowLogin,onTouchStart:this.handleShowLogin},"Login")):null}}),LogoutButton=React.createClass({displayName:"LogoutButton",handleDoLogout:function(a){this.props.handleDoLogout(a)},render:function(){return React.createElement("div",{id:"logout",className:"logout"},React.createElement("div",{onClick:this.handleDoLogout,onTouchStart:this.handleDoLogout,className:"pure-button"},"Log out"))}}),LoginPage=React.createClass({displayName:"LoginPage",mixins:[Router.State,Navigation],handleDoLogin:function(a){this.props.handleDoLogin(a)},handleCancel:function(a){this.transitionTo("/")},clearLoginMsg:function(a){$("#login-msg").empty()},render:function(){return React.createElement("form",{id:"login-form",className:"content-area pure-form"},React.createElement("div",{className:"form-inner"},React.createElement("div",null,React.createElement("input",{type:"email",id:"login-email",name:"email",placeholder:"Your email",onChange:this.clearLoginMsg,required:!0})),React.createElement("div",null,React.createElement("input",{type:"password",id:"login-password",placeholder:"Your password",onChange:this.clearLoginMsg,required:!0})),React.createElement("div",{className:"form-actions"},React.createElement("div",{className:"submit-div"},React.createElement("input",{className:"pure-button pure-button-primary",type:"submit",id:"login-submit",value:"Log in",onClick:this.handleDoLogin})),React.createElement("div",{className:"cancel-div>"},React.createElement("div",{className:"pure-button button-transparent",onTouchStart:this.handleCancel,onClick:this.handleCancel},"Cancel"))),React.createElement("div",{className:"form-msg",id:"login-msg"})))}}),AddPostButton=React.createClass({displayName:"AddPostButton",handleNewPost:function(a){this.props.handleNewPost(a)},render:function(){return React.createElement("div",{id:"new-post",className:"pure-button",onClick:this.handleNewPost,onTouchStart:this.handleNewPost},"Add Post")}}),NewPostPage=React.createClass({displayName:"NewPostPage",mixins:[Router.State,Navigation],handleAddPost:function(a){this.props.handleAddPost(a)},handleCancel:function(a){this.transitionTo("/")},render:function(){return React.createElement("form",{id:"new-post-form",className:"content-area pure-form"},React.createElement("div",{className:"form-inner"},React.createElement("div",null,React.createElement("input",{type:"text",id:"new-post-title",name:"title",placeholder:"Title here",required:!0})),React.createElement("div",null,React.createElement("textarea",{id:"new-post-text",name:"text",placeholder:"Details here",required:"required"})),React.createElement("div",{className:"form-actions"},React.createElement("div",{className:"submit-div"},React.createElement("input",{className:"pure-button pure-button-primary",type:"submit",id:"login-submit",value:"Create New Post",onClick:this.handleAddPost})),React.createElement("div",{className:"cancel-div>"},React.createElement("div",{className:"pure-button button-transparent",onTouchStart:this.handleCancel,onClick:this.handleCancel},"Cancel"))),React.createElement("div",{className:"form-msg",id:"new-post-msg"})))}}),Posts=React.createClass({displayName:"Posts",render:function(){if(void 0!==this.props.posts){var a=this.props.posts,b=[];return a.forEach(function(a,c){b.push(React.createElement(PostItem,{post:a,handleVoteUp:this.props.handleVoteUp,key:a.id}))}.bind(this)),React.createElement("div",{id:"posts",className:"posts-list"},b)}return React.createElement("div",{id:"posts",className:"posts-list"},"No posts found.")}}),PostItem=React.createClass({displayName:"PostItem",mixins:[Router.State,Navigation],contextTypes:{router:React.PropTypes.func},handleVoteUp:function(a){this.props.handleVoteUp(a)},render:function(){return React.createElement("div",{className:"post"},React.createElement("div",{className:"post-info"},React.createElement("h2",null,this.props.post.title),React.createElement("div",null,this.props.post.title)),React.createElement("div",{className:"post-vote",onTouchStart:this.handleVoteUp,onClick:this.handleVoteUp},React.createElement("div",{className:"post-vote-btn pure-button"},"Vote up")))}}),App=React.createClass({displayName:"App",mixins:[Router.State,Navigation],contextTypes:{router:React.PropTypes.func},getCategoryNameFromSlug:function(a){return"my-posts"==a?"my streams":"all-posts"==a?"all streams":a},getLocalHostData:function(){var a=[{id:"abc123",title:"hello world",text:"This here is the text",date_added:"Tue May 05 2015 19:53:51 GMT+00:00",lat:49.288028,"long":-122.865729},{id:"hola",title:"hi again",text:"another block of text here",date_added:"Tue May 05 2015 19:33:51 GMT+00:00",lat:49.288028,"long":-122.865729}];this.isMounted()&&this.setState({posts:a})},componentWillMount:function(){Router.HashLocation.addChangeListener(this.handleChangeRoute),console.log("componentWillMount");var a=this.getPath().split("/")[1];""===a&&(a="home"),this.setState({currentPage:a})},componentWillUnmount:function(){Router.HashLocation.removeChangeListener(this.handleChangeRoute)},componentDidMount:function(){1==isLocalHost&&this.getLocalHostData(),$.ajax({type:"GET",url:"https://coasteasy.com/api/v1/posts",success:function(a){console.log("it worked posts: ",a),this.setState({posts:a})}.bind(this),error:function(a){console.log("error")}.bind(this)}),docCookies.hasItem("token")&&docCookies.hasItem("user_id")&&$.ajax({type:"GET",url:"https://coasteasy.com/api/v1/users/"+docCookies.getItem("user_id"),headers:{"x-api-token":docCookies.getItem("token")},success:function(a){console.log("it worked data 123",a),this.setState({isLogin:!0,user:a.user})}.bind(this),error:function(a){console.log("error")}.bind(this)})},handleChangeRoute:function(){var a=this.getPath().split("/")[1];""===a&&(a="home"),this.setState({currentPage:a})},handleFlagItem:function(a,b){b.preventDefault(),b.stopPropagation();var c=this.state.flagged,d=c.indexOf(a);d>-1?c.splice(d,1):c.push(a),this.setState({flagged:c}),docCookies.hasItem("token")&&docCookies.hasItem("user_id")&&$.ajax({type:"PUT",headers:{"x-api-token":docCookies.getItem("token")},url:"https://alpha.stream.vu/users/"+docCookies.getItem("user_id"),contentType:"application/json",dataType:"json",data:JSON.stringify({flagged:c}),success:function(a){console.log("success flagged data: ",a),console.log("todo: add/remove optimistic js to prevent page close"),$.ajax({type:"GET",url:"https://alpha.stream.vu/flags/"+docCookies.getItem("user_id"),headers:{"x-api-token":docCookies.getItem("token")},success:function(a){console.log("flags are...",a),this.setState({flaggedEvents:a})}.bind(this),error:function(a){console.log("error")}.bind(this)})}.bind(this),error:function(a){console.log("error flagging data")}.bind(this)})},handleDoLogin:function(a){a.preventDefault(),a.stopPropagation(),$.ajax({type:"POST",url:"https://coasteasy.com/api/v1/login",data:{email:$("#login-email").val(),password:$("#login-password").val()},success:function(a){console.log("login success data",a);var b=1209600;docCookies.setItem("token",a.token,b,"/","coasteasy.com",!0),docCookies.setItem("user_id",a.user.id,b,"/","coasteasy.com",!0),this.setState({isLogin:!0,user:a.user}),this.transitionTo("/")}.bind(this),error:function(a){$("#login-email").focus(),console.log("error"),$("#login-msg").html('Invalid email/password.<br /><a href="mailto:adamjones.ca@gmail.com">Need help?</a>')}.bind(this)})},handleDoLogout:function(a){a.preventDefault(),a.stopPropagation(),docCookies.removeItem("token","/","coasteasy.com"),docCookies.removeItem("user_id","/","coasteasy.com"),this.setState({isLogin:!1}),this.transitionTo("/")},handleNewPost:function(a){a.preventDefault(),a.stopPropagation(),this.transitionTo("/new-post")},handleAddPost:function(a){a.preventDefault(),a.stopPropagation(),$.ajax({type:"POST",url:"https://coasteasy.com/api/v1/posts",headers:{"x-api-token":docCookies.getItem("token")},data:{title:$("#new-post-title").val(),text:$("#new-post-text").val()},success:function(a){console.log("login success data",a),this.transitionTo("/")}.bind(this),error:function(a){console.log("error"),$("#new-post-title").focus(),$("#new-post-msg").html("Here is an error... ugh.")}.bind(this)})},handleVoteUp:function(a){a.preventDefault(),a.stopPropagation(),console.log("vote up")},handleGoHome:function(a){a.preventDefault(),a.stopPropagation(),this.transitionTo("/")},getInitialState:function(){if(docCookies.hasItem("token"))var a=!0;else var a=!1;return{posts:[],isLogin:a,user:{},currentPage:""}},render:function(){return React.createElement("div",{id:"content-container",className:"page-"+this.state.currentPage+" login-"+this.state.isLogin},React.createElement("div",{id:"header",onClick:this.handleHeaderClick},React.createElement("div",{id:"logo"},React.createElement("h1",null,React.createElement("a",{href:"/",onClick:this.handleGoHome,onTouchStart:this.handleGoHome},React.createElement("svg",{version:"1.1",id:"logo-svg",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 177.7 177.9","enable-background":"new 0 0 177.7 177.9"},React.createElement("path",{id:"XMLID_9_",opacity:"0.89",fill:"#1C7499",d:"M36.9,84.3c2.4-26.6,24.8-47.5,52-47.5s49.6,20.9,52,47.5h36.9 C175.3,37.3,136.4,0,88.9,0S2.4,37.3,0,84.3H36.9z"}),React.createElement("path",{id:"XMLID_10_",opacity:"0.89",fill:"#1C7499",d:"M48.5,94.3c2.6,20,19.7,35.4,40.4,35.4c5.6,0,10.9-1.1,15.8-3.2 c1.7,3.1,3.4,6.2,5.2,9.2c0.2,0.3,0.3,0.5,0.5,0.7c-6.6,3-13.8,4.7-21.5,4.7c-27,0-49.3-20.6-51.9-46.9H0 c2.8,46.7,41.5,83.6,88.8,83.6s86.1-37,88.8-83.6H48.5z"}),React.createElement("path",{id:"XMLID_13_",opacity:"0.71",fill:"#FFCF05",d:"M88.8,48.2C68,48.2,50.7,64,48.4,84.3h80.9C127,64,109.7,48.2,88.8,48.2z"}))))),"new-post"!==this.state.currentPage?React.createElement(AddPostButton,{handleNewPost:this.handleNewPost}):null),React.createElement(RouteHandler,{posts:this.state.posts,handleDoLogin:this.handleDoLogin,handleAddPost:this.handleAddPost,handleVoteUp:this.handleVoteUp}))}}),routes=React.createElement(Route,{name:"home",handler:App,path:"/"},React.createElement(Route,{name:"LoginPage",handler:LoginPage,path:"login"}),React.createElement(Route,{name:"NewPostPage",handler:NewPostPage,path:"new-post"}),React.createElement(DefaultRoute,{handler:Posts}));Router.run(routes,function(a,b){React.render(React.createElement(a,null),document.getElementById("app"))});