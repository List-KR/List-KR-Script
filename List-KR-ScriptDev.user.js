// ==UserScript==
// @name         List-KR Script Dev
// @encoding     utf-8
// @namespace    https://github.com/List-KR/List-KR-Script
// @homepageURL  https://github.com/List-KR/List-KR-Script
// @supportURL   https://github.com/List-KR/List-KR-Script/issues/4
// @updateURL    https://github.com/List-KR/List-KR-Script/raw/master/List-KR-ScriptDev.user.js
// @downloadURL  https://github.com/List-KR/List-KR-Script/raw/master/List-KR-ScriptDev.user.js
// @license      GPL-3.0
//
// @version      2.0d12
// @author       PiQuark6046 and contributors
//
// @match        *://ad-shield.team/*
// @match        *://algumon.com/*
// @match        *://*.algumon.com/*
// @match        *://loawa.com/*
// @match        *://*.loawa.com/*
// @match        *://*.inven.co.kr/*
// @match        *://ygosu.com/*
// @match        *://ppss.kr/*
// @match        *://ad-shield.io/*
// @match        *://sports.donga.com/*
// @match        *://mlbpark.donga.com/*
// @match        *://etoland.co.kr/*
// @match        *://*.etoland.co.kr/*
// @match        *://*.op.gg/*
// @match        *://tgd.kr/*
// @exclude      *://tgd.kr/member/login_page*
// @exclude      *://member.op.gg/*
// @exclude      *://etoland.co.kr/bbs/register.php
// @exclude      *://etoland.co.kr/bbs/password_lost.php
// @exclude      *://secure.donga.com/*
// @exclude      *://member.inven.co.kr/*
//
// @description        List-KR Script allows you to block complicated advertisement to block on website protected by ad-shield, etc.
//
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
'use strict';

// Ad-Shield

if (function() { for (var i in LKSConstant.AdShield.AppliedURLs) { if (LKSConstant.AdShield.AppliedURLs[i].test(LKSLib.location)) { return true; } } return false; })
{

}

})();