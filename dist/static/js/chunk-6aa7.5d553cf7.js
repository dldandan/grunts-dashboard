(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6aa7"],{125:function(n,t){},126:function(n,t){},zd34:function(n,t,i){"use strict";i.r(t),i.d(t,"export_txt_to_zip",function(){return c});var o=i("fDnD"),e=i.n(o);function c(n,t,i,o){var c=new e.a,r=i||"file",f=o||"file",a=n+"\r\n";t.forEach(function(n){var t;t=n.toString(),a+=t+"\r\n"}),c.file(r+".txt",a),c.generateAsync({type:"blob"}).then(function(n){saveAs(n,f+".zip")},function(n){alert("导出失败")})}i("MnM9")}}]);