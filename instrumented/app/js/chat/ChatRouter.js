
var __cov__ZpdlNxoi2b0iWQFVqbU8g = (Function('return this'))();
if (!__cov__ZpdlNxoi2b0iWQFVqbU8g.__coverage__) { __cov__ZpdlNxoi2b0iWQFVqbU8g.__coverage__ = {}; }
__cov__ZpdlNxoi2b0iWQFVqbU8g = __cov__ZpdlNxoi2b0iWQFVqbU8g.__coverage__;
if (!(__cov__ZpdlNxoi2b0iWQFVqbU8g['app/js/chat/ChatRouter.js'])) {
   __cov__ZpdlNxoi2b0iWQFVqbU8g['app/js/chat/ChatRouter.js'] = {"path":"app/js/chat/ChatRouter.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":29}}},"2":{"name":"(anonymous_2)","line":4,"loc":{"start":{"line":4,"column":11},"end":{"line":4,"column":39}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":37,"column":3}},"2":{"start":{"line":4,"column":4},"end":{"line":36,"column":6}},"3":{"start":{"line":5,"column":8},"end":{"line":35,"column":15}}},"branchMap":{}};
}
__cov__ZpdlNxoi2b0iWQFVqbU8g = __cov__ZpdlNxoi2b0iWQFVqbU8g['app/js/chat/ChatRouter.js'];
__cov__ZpdlNxoi2b0iWQFVqbU8g.s['1']++;define(function(require){'use strict';__cov__ZpdlNxoi2b0iWQFVqbU8g.f['1']++;__cov__ZpdlNxoi2b0iWQFVqbU8g.s['2']++;return function($stateProvider){__cov__ZpdlNxoi2b0iWQFVqbU8g.f['2']++;__cov__ZpdlNxoi2b0iWQFVqbU8g.s['3']++;$stateProvider.state('chat',{access:{loginRequired:true,requiredPermissions:['Super','Admin','Registered']},url:'/',views:{'chatsList':{templateUrl:'partials/chat/list.html',controller:'ChatListCtrl'},'contentHeader':{controller:'ChatBaseCtrl'}}}).state('chat.details',{access:{loginRequired:true,requiredPermissions:['Super','Admin','Registered']},parent:'chat',url:'chat/:id',views:{'contentBody@':{templateUrl:'partials/chat/details.html',controller:'ChatDetailsCtrl'}}});};});
