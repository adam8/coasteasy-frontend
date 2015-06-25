function slugify(a){return a.toString().toLowerCase().replace(/\s+/g,"-").replace(/\:+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").trim()}function randomStr(a){for(var b="",c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",d=0;a>d;d++)b+=c.charAt(Math.floor(Math.random()*c.length));return b}function hideMenus(){null!==document.getElementById("whatever-menu")&&document.getElementById("whatever-menu").classList.remove("menu-show")}var isLocalHost=!1;"localhost"==document.location.hostname&&(isLocalHost=!0);var Router=ReactRouter,Route=Router.Route,Link=Router.Link,DefaultRoute=Router.DefaultRoute,Navigation=Router.Navigation,RouteHandler=Router.RouteHandler,PropTypes=React.PropTypes,docCookies={getItem:function(a){return a?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(a,b,c,d,e,f){if(!a||/^(?:expires|max\-age|path|domain|secure)$/i.test(a))return!1;var g="";if(c)switch(c.constructor){case Number:g=c===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+c;break;case String:g="; expires="+c;break;case Date:g="; expires="+c.toUTCString()}return document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+g+(e?"; domain="+e:"")+(d?"; path="+d:"")+(f?"; secure":""),!0},removeItem:function(a,b,c){return this.hasItem(a)?(document.cookie=encodeURIComponent(a)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(c?"; domain="+c:"")+(b?"; path="+b:""),!0):!1},hasItem:function(a){return a?new RegExp("(?:^|;\\s*)"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie):!1},keys:function(){for(var a=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),b=a.length,c=0;b>c;c++)a[c]=decodeURIComponent(a[c]);return a}},LoginButton=React.createClass({displayName:"LoginButton",mixins:[Router.State,Navigation],handleShowLogin:function(a){a.preventDefault(),a.stopPropagation(),this.transitionTo("/login")},render:function(){return"login"!==this.props.currentPage?React.createElement("div",{id:"login"},React.createElement("div",{className:"pure-button",id:"login-show",onClick:this.handleShowLogin,onTouchStart:this.handleShowLogin},"Login")):null}}),LogoutButton=React.createClass({displayName:"LogoutButton",handleDoLogout:function(a){this.props.handleDoLogout(a)},render:function(){return React.createElement("div",{id:"logout",className:"logout"},React.createElement("div",{onClick:this.handleDoLogout,onTouchStart:this.handleDoLogout,className:"pure-button"},"Log out"))}}),LoginPage=React.createClass({displayName:"LoginPage",mixins:[Router.State,Navigation],handleDoLogin:function(a){this.props.handleDoLogin(a)},handleCancel:function(a){this.transitionTo("/")},clearLoginMsg:function(a){$("#login-msg").empty()},render:function(){return React.createElement("form",{id:"login-form",className:"content-area pure-form"},React.createElement("div",{className:"form-inner"},React.createElement("div",null,React.createElement("input",{type:"email",id:"login-email",name:"email",placeholder:"Your email",onChange:this.clearLoginMsg,required:!0})),React.createElement("div",null,React.createElement("input",{type:"password",id:"login-password",placeholder:"Your password",onChange:this.clearLoginMsg,required:!0})),React.createElement("div",{className:"form-actions"},React.createElement("div",{className:"submit-div"},React.createElement("input",{className:"pure-button pure-button-primary",type:"submit",id:"login-submit",value:"Log in",onClick:this.handleDoLogin})),React.createElement("div",{className:"cancel-div>"},React.createElement("div",{className:"pure-button button-transparent",onTouchStart:this.handleCancel,onClick:this.handleCancel},"Cancel"))),React.createElement("div",{className:"form-msg",id:"login-msg"})))}}),AddPostButton=React.createClass({displayName:"AddPostButton",handleNewPost:function(a){this.props.handleNewPost(a)},render:function(){return React.createElement("div",{id:"new-post",className:"pure-button",onClick:this.handleNewPost,onTouchStart:this.handleNewPost},"Add Post")}}),NewPostPage=React.createClass({displayName:"NewPostPage",mixins:[Router.State,Navigation],handleAddPost:function(a){this.props.handleAddPost(a)},handleCancel:function(a){this.transitionTo("/")},render:function(){return React.createElement("form",{id:"new-post-form",className:"content-area pure-form"},React.createElement("div",{className:"form-inner"},React.createElement("div",null,React.createElement("input",{type:"text",id:"new-post-title",name:"title",placeholder:"Title here",required:!0})),React.createElement("div",null,React.createElement("textarea",{id:"new-post-text",name:"text",placeholder:"Details here",required:"required"})),React.createElement("div",{className:"form-actions"},React.createElement("div",{className:"submit-div"},React.createElement("input",{className:"pure-button pure-button-primary",type:"submit",id:"login-submit",value:"Create New Post",onClick:this.handleAddPost})),React.createElement("div",{className:"cancel-div>"},React.createElement("div",{className:"pure-button button-transparent",onTouchStart:this.handleCancel,onClick:this.handleCancel},"Cancel"))),React.createElement("div",{className:"form-msg",id:"new-post-msg"})))}}),Posts=React.createClass({displayName:"Posts",render:function(){if(void 0!==this.props.posts){var a=this.props.posts,b=[];return a.forEach(function(a,c){b.push(React.createElement(PostItem,{post:a,key:a.id}))}.bind(this)),React.createElement("div",{className:"posts-list"},b)}return React.createElement("div",{className:"posts-list"},"No posts found.")}}),PostItem=React.createClass({displayName:"PostItem",mixins:[Router.State,Navigation],contextTypes:{router:React.PropTypes.func},render:function(){return React.createElement("div",{className:"post"},React.createElement("h2",null,this.props.post.title),React.createElement("div",null,this.props.post.title))}}),App=React.createClass({displayName:"App",mixins:[Router.State,Navigation],contextTypes:{router:React.PropTypes.func},getCategoryNameFromSlug:function(a){return"my-posts"==a?"my streams":"all-posts"==a?"all streams":a},getLocalHostData:function(){var a=[{id:"abc123",title:"hello world",text:"This here is the text",date_added:"Tue May 05 2015 19:53:51 GMT+00:00",lat:49.288028,"long":-122.865729},{id:"hola",title:"hi again",text:"another block of text here",date_added:"Tue May 05 2015 19:33:51 GMT+00:00",lat:49.288028,"long":-122.865729}];this.isMounted()&&this.setState({posts:a})},componentWillMount:function(){Router.HashLocation.addChangeListener(this.handleChangeRoute),console.log("componentWillMount");var a=this.getPath().split("/")[1];""===a&&(a="home"),this.setState({currentPage:a})},componentWillUnmount:function(){Router.HashLocation.removeChangeListener(this.handleChangeRoute)},componentDidMount:function(){1==isLocalHost&&this.getLocalHostData(),$.ajax({type:"GET",url:"https://coasteasy.com/api/v1/posts",success:function(a){console.log("it worked posts: ",a),this.setState({posts:a})}.bind(this),error:function(a){console.log("error")}.bind(this)}),docCookies.hasItem("token")&&docCookies.hasItem("user_id")&&$.ajax({type:"GET",url:"https://coasteasy.com/api/v1/users/"+docCookies.getItem("user_id"),headers:{"x-api-token":docCookies.getItem("token")},success:function(a){console.log("it worked data 123",a),this.setState({isLogin:!0,user:a.user})}.bind(this),error:function(a){console.log("error")}.bind(this)})},handleChangeRoute:function(){var a=this.getPath().split("/")[1];""===a&&(a="home"),this.setState({currentPage:a})},handleFlagItem:function(a,b){b.preventDefault(),b.stopPropagation();var c=this.state.flagged,d=c.indexOf(a);d>-1?c.splice(d,1):c.push(a),this.setState({flagged:c}),docCookies.hasItem("token")&&docCookies.hasItem("user_id")&&$.ajax({type:"PUT",headers:{"x-api-token":docCookies.getItem("token")},url:"https://alpha.stream.vu/users/"+docCookies.getItem("user_id"),contentType:"application/json",dataType:"json",data:JSON.stringify({flagged:c}),success:function(a){console.log("success flagged data: ",a),console.log("todo: add/remove optimistic js to prevent page close"),$.ajax({type:"GET",url:"https://alpha.stream.vu/flags/"+docCookies.getItem("user_id"),headers:{"x-api-token":docCookies.getItem("token")},success:function(a){console.log("flags are...",a),this.setState({flaggedEvents:a})}.bind(this),error:function(a){console.log("error")}.bind(this)})}.bind(this),error:function(a){console.log("error flagging data")}.bind(this)})},handleDoLogin:function(a){a.preventDefault(),a.stopPropagation(),$.ajax({type:"POST",url:"https://coasteasy.com/api/v1/login",data:{email:$("#login-email").val(),password:$("#login-password").val()},success:function(a){console.log("login success data",a);var b=1209600;docCookies.setItem("token",a.token,b,"/","coasteasy.com",!0),docCookies.setItem("user_id",a.user.id,b,"/","coasteasy.com",!0),this.setState({isLogin:!0,user:a.user}),this.transitionTo("/")}.bind(this),error:function(a){$("#login-email").focus(),console.log("error"),$("#login-msg").html('Invalid email/password.<br /><a href="mailto:adamjones.ca@gmail.com">Need help?</a>')}.bind(this)})},handleDoLogout:function(a){a.preventDefault(),a.stopPropagation(),docCookies.removeItem("token","/","coasteasy.com"),docCookies.removeItem("user_id","/","coasteasy.com"),this.setState({isLogin:!1}),this.transitionTo("/")},handleNewPost:function(a){a.preventDefault(),a.stopPropagation(),this.transitionTo("/new-post")},handleAddPost:function(a){a.preventDefault(),a.stopPropagation(),$.ajax({type:"POST",url:"https://coasteasy.com/api/v1/posts",headers:{"x-api-token":docCookies.getItem("token")},data:{title:$("#new-post-title").val(),text:$("#new-post-text").val()},success:function(a){console.log("login success data",a),this.transitionTo("/")}.bind(this),error:function(a){console.log("error"),$("#new-post-title").focus(),$("#new-post-msg").html("Here is an error... ugh.")}.bind(this)})},handleGoHome:function(a){a.preventDefault(),a.stopPropagation(),this.transitionTo("/")},getInitialState:function(){if(docCookies.hasItem("token"))var a=!0;else var a=!1;return{posts:[],isLogin:a,user:{},currentPage:""}},render:function(){return React.createElement("div",{id:"content-container",className:"page-"+this.state.currentPage+" login-"+this.state.isLogin},React.createElement("div",{id:"header",onClick:this.handleHeaderClick},React.createElement("div",{id:"logo"},React.createElement("h1",null,React.createElement("a",{href:"/",onClick:this.handleGoHome,onTouchStart:this.handleGoHome},"Coast Easy"))),"new-post"!==this.state.currentPage?React.createElement(AddPostButton,{handleNewPost:this.handleNewPost}):null,this.state.isLogin===!0?React.createElement(LogoutButton,{handleDoLogout:this.handleDoLogout,user:this.state.user}):React.createElement(LoginButton,{currentPage:this.state.currentPage,handleDoLogin:this.handleDoLogin})),React.createElement(RouteHandler,{posts:this.state.posts,handleDoLogin:this.handleDoLogin,handleAddPost:this.handleAddPost}))}}),routes=React.createElement(Route,{name:"home",handler:App,path:"/"},React.createElement(Route,{name:"LoginPage",handler:LoginPage,path:"login"}),React.createElement(Route,{name:"NewPostPage",handler:NewPostPage,path:"new-post"}),React.createElement(DefaultRoute,{handler:Posts}));Router.run(routes,function(a,b){React.render(React.createElement(a,null),document.getElementById("app"))});