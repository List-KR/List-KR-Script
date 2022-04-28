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
// @version      2.0d11
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

const LKSConstant =
{
    CreateInvisibleElement:
    {
        Styles: ["width", "height", "display", "visibility"],
        RandomElement: ["0px", "0px", "none", "collapse"],
        CoverElement: ["", "", "", ""]
    },
    CreateHoverElement:
    {
        Delay: 0
    },
    NamuWiki:
    {
        ArticleElementArray: ["div.wiki-paragraph", "div.namuwiki-toc-ad"],
        CategoryElementArray: ["div[class]#category-문서"],
        PowerLink:
        {
            HeaderAddressArray: [/data:image\//g, /\/\/w.namu.la\/s\//g]
        }
    },
    AdShield:
    {
        AppliedURLs: [/:\/\/tgd\.kr\//g, /:\/\/etoland\.co\.kr\//g, /:\/\/[\w\d.]{1,}\.etoland\.co\.kr\//g, /:\/\/[\w\d.]{1,}\.op\.gg\//g, /:\/\/ppss\.kr\//g, /:\/\/ygosu\.com\//g, /:\/\/ad-shield\.io\//g, /:\/\/sports\.donga\.com\//g, /:\/\/mlbpark\.donga\.com\//g]
    },
    Random:
    {
        String: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    }
};
const LKSDebug =
{
    Error: function(Name, Context)
    {
        var e = new Error(Context);
        e.name = Name;
        throw e;
    }
}
var LKSLib = {};
LKSLib.window = typeof unsafeWindow == "undefined" ? window : unsafeWindow;
LKSLib.MutationObserver = LKSLib.window.MutationObserver;
LKSLib.MutationRecor = LKSLib.window.MutationRecord;
LKSLib.location = LKSLib.window.location;
LKSLib.GenerateRandom = function(BaseString, Length)
{
    if (typeof length == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.GenerateRandom: Received Length, but not an number.");
    }
    var Returns;
    for (var i = 0; i < Length; i++)
    {
        Returns += BaseString.charAt(Math.floor(Math.random() * BaseString.length));
    }
    return Returns;
};
LKSLib.CheckElementHasComputedStyle = function(Elementv, HasStyle)
{
    if (NodeList.prototype.isPrototypeOf(Elementv) || Array.isArray(Elementv) || typeof Elementv == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]]", "LKSLib.CheckElementHasStyle: Received Elementv, but not an object.");
    }
    if (LKSLib.window.getComputedStyle(Elementv).getPropertyValue(HasStyle[0]) == HasStyle[1])
    {
        return true;
    }
    else
    {
        return false;
    }
};
LKSLib.CheckElementHasComputedStyles = function(Elementv, HasStyleArray)
{
    if (NodeList.prototype.isPrototypeOf(Elementv) || Array.isArray(Elementv) || typeof Elementv == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckElementHasStyles: Received Elementv, but not an object.");
    }
    for (var i in HasStyleArray)
    {
        if (LKSLib.CheckElementHasComputedStyle(Elementv, HasStyleArray[i]) == false)
        {
            return false;
        }
    }
    return true;
};
LKSLib.SearchElementsHasComputedStyle = function(ElementType, HasStyle)
{
    var Elements = typeof ElementType == "string" ? LKSLib.window.document.querySelectorAll(ElementType) : ElementType, ReturnArray = [];
    if (NodeList.prototype.isPrototypeOf(Elements))
    {
        Elements = Array.from(Elements);
    }
    for (var i in Elements)
    {
        if (LKSLib.CheckElementHasComputedStyle(Elements[i], HasStyle))
        {
            ReturnArray.push(Elements[i]);
        }
    }
    if (ReturnArray.length > 0)
    {
        return ReturnArray;
    }
    else
    {
        return null;
    }
};
LKSLib.SearchElementsHasComputedStyles = function(ElementType, HasStyleArray) // ElementType support string, NodeList, Array. Elments of returned array have all each HasStyleArray.
{
    var Elements = typeof ElementType == "string" ? LKSLib.window.document.querySelectorAll(ElementType) : ElementType, ReturnArray = [];
    if (NodeList.prototype.isPrototypeOf(Elements))
    {
        Elements = Array.from(Elements);
    }
    for (var i in Elements)
    {
        if (LKSLib.CheckElementHasComputedStyles(Elements[i], HasStyleArray))
        {
            ReturnArray.push(Elements[i]);
        }
    }
    if (ReturnArray.length > 0)
    {
        return ReturnArray;
    }
    else
    {
        return null;
    }
};
LKSLib.CheckElementHasOnlyStyle = function(Elementv, HasStyle)
{
    if (NodeList.prototype.isPrototypeOf(Elementv) || Array.isArray(Elementv) || typeof Elementv == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckElementHasOnlyStyle: Received Elementv, but not an object.");
    }
    if (Elementv.style[HasStyle[0]] == HasStyle[1])
    {
        return true;
    }
    else
    {
        return false;
    }
};
LKSLib.CheckElementHasOnlyStyles = function(Elementv, HasStyleArray)
{
    if (NodeList.prototype.isPrototypeOf(Elementv) || Array.isArray(Elementv) || typeof Elementv == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckElementHasOnlyStyles: Received Elementv, but not an object.");
    }
    for (var i in HasStyleArray)
    {
        if (LKSLib.CheckElementHasOnlyStyle(Elementv, HasStyleArray[i]) == false)
        {
            return false;
        }
    }
    return true;
};
LKSLib.SearchElementsHasOnlyStyle = function(ElementType, HasStyle)
{
    var Elements = typeof ElementType == "string" ? LKSLib.window.document.querySelectorAll(ElementType) : ElementType, ReturnArray = [];
    if (NodeList.prototype.isPrototypeOf(Elements))
    {
        Elements = Array.from(Elements);
    }
    for (var i in Elements)
    {
        if (LKSLib.CheckElementHasOnlyStyles(Elements[i], HasStyle))
        {
            ReturnArray.push(Elements[i]);
        }
    }
    if (ReturnArray.length > 0)
    {
        return ReturnArray;
    }
    else
    {
        return null;
    }
};
LKSLib.SearchElementsHasOnlyStyles = function(ElementType, HasStyleArray) // ElementType support string, NodeList, Array. Elments of returned array have all each HasStyleArray.
{
    var Elements = typeof ElementType == "string" ? LKSLib.window.document.querySelectorAll(ElementType) : ElementType, ReturnArray = [];
    if (NodeList.prototype.isPrototypeOf(Elements))
    {
        Elements = Array.from(Elements);
    }
    for (var i in Elements)
    {
        if (LKSLib.CheckElementHasOnlyStyles(Elements[i], HasStyleArray))
        {
            ReturnArray.push(Elements[i]);
        }
    }
    if (ReturnArray.length > 0)
    {
        return ReturnArray;
    }
    else
    {
        return null;
    }
};
LKSLib.CheckHasElement = function(ParentElement, TargetElement, Depth) // null means that mentioned element does not exist. Returns bool type.
{
    if (NodeList.prototype.isPrototypeOf(ParentElement) || Array.isArray(ParentElement) || typeof ParentElement == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckHasElement: Received ParentElement, but not an object.");
    }
    if (NodeList.prototype.isPrototypeOf(TargetElement) || Array.isArray(TargetElement) || typeof TargetElement == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckHasElement: Received TargetElement, but not an object.");
    }
    if (Depth != null || typeof Depth != "number")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckHasElement: Received Depth, but not a number or null.");
    }
    var ReturnArray = [ParentElement];
    Depth = Depth == null ? Number.MAX_SAFE_INTEGER : Depth;
    for (var i in ReturnArray)
    {
        if (ReturnArray[i] == TargetElement)
        {
            return true;
        }
        if (ReturnArray[i].childElementCount > 0)
        {
            for (var j in Array.from(ReturnArray[i].childNodes))
            {
                ReturnArray.push(Array.from(ReturnArray[i].childNodes)[j]);
            }
        }
    }
    return false;
};
LKSLib.CheckHasAncestorElement = function(TargetElement, ParentElement, Depth)
{
    if (NodeList.prototype.isPrototypeOf(ParentElement) || Array.isArray(ParentElement) || typeof ParentElement == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]]", "LKSLib.CheckHasAncestorElement: Received ParentElement, but not an object.");
    }
    if (NodeList.prototype.isPrototypeOf(TargetElement) || Array.isArray(TargetElement) || typeof TargetElement == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckHasAncestorElement: Received TargetElement, but not an object.");
    }
    if (Depth != null && typeof Depth != "number")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckHasAncestorElement: Received Depth, but not a number or null.");
    }
    var ReturnArray = [ParentElement];
    Depth = Depth == null ? Number.MAX_SAFE_INTEGER : Depth;
    for (var i = 0; i < Depth; i++)
    {
        if (ReturnArray[i].parentNode.URL != undefined)
        {
            break;
        }
        ReturnArray.unshift(ReturnArray[i].parentNode);
    }
    if (ReturnArray.find(element => element == TargetElement) != undefined)
    {
        return true;
    }
    else
    {
        return false;
    }
};
LKSLib.CheckHasGenerationElement = function(BaseElement, TargetElement)
{
    if (NodeList.prototype.isPrototypeOf(BaseElement) || Array.isArray(BaseElement) || typeof BaseElement == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckHasGenerationElement: Received BaseElement, but not an object.");
    }
    if (NodeList.prototype.isPrototypeOf(TargetElement) || Array.isArray(TargetElement) || typeof TargetElement == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckHasGenerationElement: Received TargetElement, but not an object.");
    }
    if (BaseElement.parentNode.URL != undefined)
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CheckHasGenerationElement: Received BaseElement, but html.");
    }
    if (Array.from(BaseElement.parentNode.childNodes).find(element => element == TargetElement) != undefined)
    {
        return true;
    }
    else
    {
        return false;
    }
};
LKSLib.HideElements = function(ElementArray)
{
    if (!Array.isArray(ElementArray))
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.HideElements: Received ElementArray, but not an array.");
    }
    for (var i in ElementArray)
    {
        ElementArray[i].style.display = "none";
    }
};
LKSLib.CreateInvisibleElement = function(ParentElement, CoverElementsArray, IDLength)
{
    if (NodeList.prototype.isPrototypeOf(ParentElement) || Array.isArray(ParentElement) || typeof ParentElement == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CreateInvisibleElement: Received ParentElement, but not an object.");
    }
    if (NodeList.prototype.isPrototypeOf(CoverElementsArray))
    {
        CoverElementsArray = Array.from(CoverElementsArray);
    }
    else if (typeof CoverElementsArray == "string")
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.CreateInvisibleElement: Received ParentElement, but not an array or NodeList.");
    }
    var RandomElement = ParentElement.createElement("div#" + LKSLib.GenerateRandom(LKSConstant.Random, IDLength));
    for (var i in LKSConstant.CreateInvisibleElement.Styles)
    {
        RandomElement.style[LKSConstant.CreateInvisibleElement.Styles[i]] = LKSConstant.CreateInvisibleElement.RandomElement[i];
    }
    for (var j in CoverElementsArray)
    {
        for (var k in LKSConstant.CreateInvisibleElement.Styles)
        {
            if (LKSConstant.CreateInvisibleElement.CoverElement[j] != null)
            {
                CoverElementsArray[j].style[LKSConstant.CreateInvisibleElement.Styles[k]] = LKSConstant.CreateInvisibleElement.CoverElement[k];
            }
        }
        RandomElement.appendChild(CoverElementsArray[j]);
    }
};
LKSLib.CreateHoverElement = function(ParentElement, HoverElement, IDLength)
{

};
LKSLib.ConvertImageURLToBase64 = function(ImageURL)
{
    // If the request is falied, the function will return null.
    const ImageResponse = fetch(new Request(ImageURL));
    ImageResponse.then((res) => {if (!res.ok) { return null; }});
    ImageResponse.then(res => res.blob()).then(blob => {
    var ImageB = new Image();
        ImageB.src = URL.createObjectURL(blob);
        const Reader = new FileReader();
        Reader.addEventListener("load", () => {
            return Reader.result.replace("data:", "").replace(/^.+,/, "");
        });
        Reader.readAsDataURL(ImageB);
    });
};
LKSLib.ReleaseMemory = function(VariableArray) // To clear the variables, conver them with array.
{
    if (VariableArray == undefined || VariableArray == null)
    {
        LKSDebug.Error("[LISTKRSCRIPT ERROR]", "LKSLib.ReleaseMemory: Received variableArray, but undefined or null.");
    }
    if (Array.isArray(VariableArray))
    {
        for (var i in VariableArray)
        {
            VariableArray[i] = null;
        }
    }
    else
    {
        VariableArray = null;
    }
};

// ######################################################################################
// ######################################################################################

// namu.wiki
if (/:\/\/namu\.wiki\/w\//g.test(LKSLib.location))
{
    var ArticleTopElement;
    var Watch = function(MutationList, Observer)
    {
        for(var Mutation of MutationList)
        {
            for (var i in Array.from(Mutation.target.attributes))
            {
                if (Array.from(Mutation.target.attributes)[i].name == "src" && LKSConstant.NamuWiki.PowerLink.HeaderAddressArray.find(element => element.test(Array.from(Mutation.target.attributes)[i].nodeValue) == true) != undefined)
                {
                    var DivElements = LKSLib.SearchElementsHasComputedStyles("div", [["border-top-style", "solid"], ["box-sizing", "border-box"], ["word-break", "break-all"], ["background-origin", "padding-box"], ["background-size", "auto"]]);
                    LKSLib.HideElements([DivElements[DivElements.length - 1]]);
                    LKSLib.window.console.log(DivElements[DivElements.length - 1]);
                }
            }
        }
    };
    var func = function ()
    {
        for (var i in Array.from(LKSLib.window.document.querySelectorAll("img")))
        {
            new LKSLib.MutationObserver(Watch).observe(Array.from(document.querySelectorAll("img"))[i], {attributes: true});
        }
    };
    if (LKSLib.window.document.addEventListener)
    {
        LKSLib.window.document.addEventListener("DOMContentLoaded", func);
        LKSLib.window.document.addEventListener("hashchange", func);
    }
}

// Ad-Shield

if (function() { for (var i in LKSConstant.AdShield.AppliedURLs) { if (LKSConstant.AdShield.AppliedURLs[i].test(LKSLib.location)) { return true; } } return false; })
{

}

})();