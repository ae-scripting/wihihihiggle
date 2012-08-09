﻿// whihihiggle.jsx// this script adds a wiggle expression to the selected properties.// its like aGUI for the wiggle Method// Copyright (c)  2012 // Fabian "fabiantheblind" Morón Zirfas  // http://fabiantheblind.info// Permission is hereby granted, free of charge, to any // person obtaining a copy of this software and associated// documentation files (the "Software"), to deal in the Software// without restriction, including without limitation the rights // to use, copy, modify, merge, publish, distribute, sublicense,// and/or sell copies of the Software, and to  permit persons to // whom the Software is furnished to do so, subject to // the following conditions:  // The above copyright notice and this permission notice// shall be included in all copies or substantial portions of the Software.  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  // see also http://www.opensource.org/licenses/mit-license.php{// ------------ some global objects ------------var website = "http://fabiantheblind.info";meta = {        "freq"                  : 1,    "amp"                   : 25,    "seed"                  : 100,    "octaves"               : 1,        "amp_mult"              : 0.5,    "t"                     : 1,    "time_expr"             : "time",    "default_time_expr"     : "time",    "framesPerSecond"       : 1,    "loopTime"              : 5 ,    "freq_def"              : 1,     "amp_def"               : 25,    "seed_def"              : 100,    "octaves_def"           : 1,    "amp_mult_def"          : 0.5,    "t_def"                 : 1,    "time_expr_def"         : "time",    "default_time_expr_def" : "time",    "framesPerSecond_def"   : 1,    "loopTime_def"          : 5 ,    "ctrlname"              : "whihihiggle_ctrl",    "defaultctrlname"       : "whihihiggle_ctrl",    "ctrllayer"             : null,    "ctrlExists"            : false,    "addSeedRandom"         : true,    "addPosterizeTime"      : false,    "addLoop"               : false,    "addTemporal"           : false,     "addTime"               : true,     "simple"                : true,    "amp_is_expr"           : false,    "simple_amp_expr"       : "",    "freq_is_expr"          : false,    "simple_freq_expr"      : "",    "debug"                 : true,    "theWebsite"            : website,    "settingsSectionName"   : "whihihigglescript",    "helpText"              : ""    };uiStrings  = {    "theWebsite": website,    "theglobalscriptname": "whihihiggle"};errorStrings = {    "NAN" : "Sorry. This is not a number.\nI will reset the value to:\n",    "novalue": "You have to enter a value. I will reset to the last known value of:\n",    "expressionNotValid" : function(name){        var str = "The expression you added on "+name+"is not valid.\nI will add it but it will be disabled";        return str;    }};helpTipStrings  = {    "simple"                : "If you uncheck this all the options for e.g. 'octaves', 'randomSeed' get enabled.",    "usetemporal": "If checked this will use a temporalWiggle(). This type of wiggle needs keyframes. So dont wonder if nothing happens. The property will wiggle over time",      "freq"                 : "Define the frequence per second. The default is '1'. Accepts also expressions",    "amp"                   : "Define the amplitude per second. The default is '25'. Accepts also expressions",    "octaves"               : "Define the octaves for you expression. The default is '1'. The more octaves you have the more skips your property will have. Accepts also expressions",        "amp_mult"              : "Define the amplitude multiplier for the octaves. The default is '0.5'. The higher this value is the more it will amplify your skips. Keep this realy low. Accepts also expressions",    "addTime": "If checked the script will add a 'time' expression on that slider. If not it just uses a value. You can use a value and than keyframe the slider. This enables you to run time backward or stretch it for the wiggle",         "t"                     : "Define the time value. This is just a fallback. If the time does not proceed there will be no wiggle. Use the slider to keyframe the time by yourself or add an expression like 'time' .The default is '1'.", "addseed": "If checked this will add the 'seedRandom(value)' expression. This is usefull if you need to have the same behaviour on several wiggle expression but you dont want to parent the layers.",     "seed"                  : "Define the random seed for your expression. All the expression with the same random seed will have a similar behaviour. The default is '100'. Accepts also expressions",    "addpstrz": "If checked the 'posterizeTime()' expression will be added. This allows to stop the time off the expression for the given amount of frames. If added the 'add time expression' will be disabled.",            "framesPerSecond"       : "Define the a fps value for the time posterize. It is like stopping the time and wating for the given number of frames. The default is '1'. Accepts also expressions",       "addLoop"               : "If checked the loop wiggle expression by Dan Ebberts gets enabled. It allows to create a looping wiggle",    "loopTime"              : "Define the looptime in seconds. This is based on Dan Ebberts great loop wiggle expression  http://www.motionscript.com/design-guide/looping-wiggle.html . The default is '5'. Accepts also expressions",       "button_select_ctrl"    : "Hit this button and the selected layer will be used as the controller. BEWARE all the Sliders need to be there. If they are not your expression will throw an error",    "ctrlname": "Enter a name for your controller. This will be used in the expression and as the name of the 'Null Layer'",    "ctrlExists"            : "This box checks itself by hitting the Select Control button. If it is checked the Script will asume you have a controller with the name set in the textfield to the left. If you uncheck it the script will create a new controler by that given name",     "runButton"             : "Press me and i will apply your expression to the selected properties",        "reset_button"          : "This will reset all fields to their default values. Also the saved values will be reseted.",          "button_help": "Press me and i will try to help you. You also should watch the tutorials on this script on: " + meta.theWebsite        };// this is for creating the helptext from all the helpTIpsvar tempHelpTextString = "FOR TUTORIALS AND MORE INFO GOT TO " + meta.theWebsite + "\n\n";for(var key in helpTipStrings){    tempHelpTextString = tempHelpTextString + key + ": " + helpTipStrings[key] + "\n\n";};meta.helpText = tempHelpTextString;// alert(tempHelpTextString);run_scipt(this);function run_scipt(thisObj){/** * First we have to do some legal stuff * go to the end of the script to se the dialog * */var res = null;var settingsSectionName = "whihihigglescript";if((app.settings.haveSetting(settingsSectionName,"licaccept") == true)){var licres = parseInt(app.settings.getSetting(settingsSectionName,"licaccept"));if (licres==1){    res = [true,true];} else {    res = licenseDiag(uiStrings.theglobalscriptname);    };}else{  res = licenseDiag(uiStrings.theglobalscriptname);};if (!res[1]){    return;}if(res[0]){    app.settings.saveSetting(settingsSectionName,"licaccept",1);};///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW     var win   = buildUI(thisObj);   if ((win != null) && (win instanceof Window)) {      win.center();      win.show();      }; // end if win  null and not a instance of window };function buildUI (thisObj) {  // basic_ui.jsxvar win = (thisObj instanceof Panel)  ? thisObj : new Window('palette', 'whihihiggle',[0,0,260,100],{resizeable: true}); if (win != null) { // get the frequence and amplitude for quicker usage if(app.settings.haveSetting(meta.settingsSectionName,"freq")== true){    var freqsetting = app.settings.getSetting(meta.settingsSectionName,"freq");        meta.freq = freqsetting;};if(app.settings.haveSetting(meta.settingsSectionName,"amp")== true){    var ampsetting = app.settings.getSetting(meta.settingsSectionName,"amp");        meta.amp = ampsetting;};if(app.settings.haveSetting(meta.settingsSectionName,"octaves")== true){    var octavessetting = app.settings.getSetting(meta.settingsSectionName,"octaves");        meta.octaves = octavessetting;};if(app.settings.haveSetting(meta.settingsSectionName,"seed")== true){    var seedsetting = app.settings.getSetting(meta.settingsSectionName,"seed");        meta.seed = seedsetting;};if(app.settings.haveSetting(meta.settingsSectionName,"amp_mult")== true){    var amp_multsetting = app.settings.getSetting(meta.settingsSectionName,"amp_mult");        meta.amp_mult = amp_multsetting;};if(app.settings.haveSetting(meta.settingsSectionName,"loopTime")== true){    var loopTimesetting = app.settings.getSetting(meta.settingsSectionName,"loopTime");        meta.loopTime = loopTimesetting;};var advancedpanelsize = [10,95,250,350];win.button_run_main_script = win.add('button', [35,5,250,35], 'Add Whihihiggle!'); win.button_help = win .add('button',[10,5,30,35],'?');win.checkbox_simple = win.add('checkbox',  [ 10, 40,100, 60], 'simple?');win.checkbox_usetemporal = win.add('checkbox',  [ 10, 65,100, 85], 'temporal?');win.label_freq = win.add('statictext', [110,42,190,60], 'freq ------------------------'); win.label_amp = win.add('statictext', [110,72,190,90], 'amp ------------------------'); win.field_freq = win.add('edittext', [190,40,250,60], String(meta.freq)); win.field_amp = win.add('edittext', [190,70,250,90], String(meta.amp)); win.panel_advanced = win.add('group',advancedpanelsize , '');win.label_octaves       = win.panel_advanced.add('statictext', [10,5,180,25], 'octaves ------------------------'); win.field_octaves       = win.panel_advanced.add('edittext', [180,5,240,25], String(meta.octaves)); win.label_amp_mult      = win.panel_advanced.add('statictext', [10,35,180,55], 'amp_mult ------------------------'); win.field_amp_mult      = win.panel_advanced.add('edittext', [180,35,240,55], String(meta.amp_mult)); win.checkbox_addtime    = win.panel_advanced.add('checkbox',  [ 10, 65,180, 85], 'add time expression -------');win.field_time          = win.panel_advanced.add('edittext', [180,65,240,85], meta.time_expr); win.checkbox_addseed    = win.panel_advanced.add('checkbox',  [ 10, 95,180, 115], 'add random seed ---------');win.field_seed          = win.panel_advanced.add('edittext', [180,95,240,115], String(meta.seed)); win.checkbox_addpstrz   = win.panel_advanced.add('checkbox',  [ 10, 125,180, 145], 'posterize time with fps ----');win.field_pstrz_fps     = win.panel_advanced.add('edittext', [180,125,240,145], String(meta.framesPerSecond)); win.checkbox_addloop    = win.panel_advanced.add('checkbox',  [ 10, 155,180, 175], 'loop wiggle in seconds ----');win.field_looptime      = win.panel_advanced.add('edittext', [180,155,240,175], String(meta.loopTime));win.field_ctrlname      = win.panel_advanced.add('edittext',[110,185,200,205], meta.ctrlname );win.button_select_ctrl  = win.panel_advanced.add('button',[10, 185,105,205],'select controller');win.checkbox_ctrlExists = win.panel_advanced.add('checkbox',[210,185,240,205],'');win.button_reset        = win.panel_advanced.add('button',[10,210,240,230],'reset 2 default');win.label_freq.justify = 'left'; win.label_amp.justify = 'left'; win.label_octaves.justify = 'left'; win.label_amp_mult.justify = 'left'; win.field_freq                  .helpTip = helpTipStrings.freq;win.label_freq                  .helpTip = helpTipStrings.freq;win.field_amp                   .helpTip = helpTipStrings.amp;win.label_amp                   .helpTip = helpTipStrings.amp;win.label_octaves               .helpTip = helpTipStrings.octaves;win.field_octaves               .helpTip = helpTipStrings.octaves;win.label_amp_mult              .helpTip = helpTipStrings.amp_mult;win.field_amp_mult              .helpTip = helpTipStrings.amp_mult;win.checkbox_addtime            .helpTip = helpTipStrings.t;win.field_time                  .helpTip = helpTipStrings.t;win.checkbox_addseed            .helpTip = helpTipStrings.seed;win.field_seed                  .helpTip = helpTipStrings.seed;win.checkbox_addpstrz           .helpTip = helpTipStrings.framesPerSecond;win.field_pstrz_fps             .helpTip = helpTipStrings.framesPerSecond;win.checkbox_addloop            .helpTip = helpTipStrings.loopTime;win.field_looptime              .helpTip = helpTipStrings.loopTime;win.field_ctrlname              .helpTip = helpTipStrings.ctrlname;win.button_select_ctrl          .helpTip = helpTipStrings.button_select_ctrl;win.checkbox_ctrlExists         .helpTip = helpTipStrings.ctrlExists;win.button_reset                .helpTip = helpTipStrings.reset_button;win.button_run_main_script      .helpTip = helpTipStrings.runButton;win.checkbox_simple             .helpTip = helpTipStrings.simple;win.checkbox_addloop            .helpTip = helpTipStrings.addLoop;win.checkbox_addpstrz           .helpTip = helpTipStrings.addpstrz;win.checkbox_addseed            .helpTip = helpTipStrings.addseed;win.checkbox_addtime            .helpTip = helpTipStrings.addTime;win.checkbox_usetemporal        .helpTip = helpTipStrings.usetemporal;win.button_help                 .helpTip = helpTipStrings.button_help; win.checkbox_simple.value               =  meta.simple;win.checkbox_addloop.value              = meta.addLoop;win.checkbox_addpstrz.value             = meta.addPosterizeTime;win.checkbox_addseed.value              = meta.addSeedRandom;win.checkbox_addtime.value              = meta.addTime;win.checkbox_usetemporal.value          = meta.addTemporal;win.checkbox_ctrlExists.value           = meta.ctrlExists;win.panel_advanced.visible = false;win.panel_advanced.enabled = false;    win.field_freq.justify = 'left'; win.field_amp.justify = 'left'; win.field_octaves.justify = 'left'; win.field_seed.justify = 'left'; win.field_time.justify = 'left'; win.field_amp_mult.justify = 'left'; win.field_looptime.justify = 'left'; win.field_pstrz_fps.justify = 'left'; win.field_ctrlname.justify = 'left';// ------------ the edit text fields ------------win.field_freq.onChange  = function (){    if(this.text.length < 1){       this.text = meta.freq;      alert(errorStrings.novalue + meta.freq);   }else{       meta.freq = this.text;       app.settings.saveSetting(meta.settingsSectionName,"freq",meta.freq);    };};/** *  This sets the amp field * */ win.field_amp.onChange  = function (){    if(this.text.length < 1){        this.text = meta.amp;        alert(errorStrings.novalue + meta.amp);    }else{        meta.amp = this.text;        app.settings.saveSetting(meta.settingsSectionName,"amp",meta.amp);    };};win.field_octaves.onChange = function  () {        if(this.text.length < 1){        this.text = meta.octaves;        alert(errorStrings.novalue + meta.octaves);    }else{        meta.octaves = this.text;        app.settings.saveSetting(meta.settingsSectionName,"octaves",meta.octaves);    };        // meta.octaves = resetValIfNAN( parseFloat(this.text), meta.octaves, errorStrings.NAN + " " + meta.octaves);        // this.text = meta.octaves;};win.field_amp_mult.onChange = function  () {          if(this.text.length < 1){        this.text = meta.amp_mult;        alert(errorStrings.novalue + meta.amp_mult);    }else{        meta.amp_mult = this.text;        app.settings.saveSetting(meta.settingsSectionName,"amp_mult",meta.amp_mult);    };              // meta.amp_mult = resetValIfNAN( parseFloat(this.text), meta.amp_mult, errorStrings.NAN + " " + meta.amp_mult);        // this.text = meta.amp_mult;};win.field_seed.onChange = function  () {    if(this.text.length < 1){        this.text = meta.seed;        alert(errorStrings.novalue + meta.seed);    }else{        meta.seed = this.text;        app.settings.saveSetting(meta.settingsSectionName,"seed",meta.seed);    };        // meta.seed = resetValIfNAN( parseFloat(this.text), meta.seed, errorStrings.NAN + " " + meta.seed);        // this.text = meta.seed;};win.field_looptime.onChange = function  () {    if(this.text.length < 1){        this.text = meta.loopTime;        alert(errorStrings.novalue + meta.loopTime);    }else{        meta.loopTime = this.text;        app.settings.saveSetting(meta.settingsSectionName,"seed",meta.loopTime);    };        // meta.loopTime = resetValIfNAN( parseFloat(this.text), meta.loopTime, errorStrings.NAN + " " + meta.loopTime);        // this.text = meta.loopTime;};win.field_time.onChange = function(){        if(meta.addTime == true){            meta.time_expr = this.text;        }else if (meta.addTime == false) {            meta.t = resetValIfNAN(parseFloat(this.text),meta.t,errorStrings.NAN + " "+ meta.t);        };    };win.field_ctrlname.onChange = function(){        if(this.text.length > 0){            meta.ctrlname = this.text;        }else{            alert("Your controler needs a name.\nI will reset it to the last entry'"+meta.ctrlname+"'");            this.text = meta.ctrlname;        };    };// ----------------------------------------------win.button_run_main_script.onClick = function () {    if(meta.debug == true) alert(meta.toSource());    main_script(meta);};win.button_help.onClick = function(){helpDialog(meta.helpText,"Help");};win.button_select_ctrl.onClick = function () {    var curComp = app.project.activeItem;    if (!curComp || !(curComp instanceof CompItem))    {        alert("Please select a Composition.");        return;    };    if (curComp.selectedLayers.length < 1) {        alert("Please select a control layer");        return;    };    var ctrllayer = curComp.selectedLayers[0];    if(ctrllayer == null){        alert("There is an error with your controller.\n Please try again");        return;    };    // taken from redefinerys scripting fundamentals    // http://www.redefinery.com/ae/fundamentals/layers/    // where would i be without it?    // Checking for a light layer (as of After Effects 7.0)if (ctrllayer instanceof LightLayer){    alert("Sorry buddy - this is a light layer.\nLight layers cant hold a expression controller");    return;    };// Checking for a camera layer (as of After Effects 7.0)if (ctrllayer instanceof CameraLayer){        alert("Sorry buddy - this is a camera layer.\camera layers cant hold a expression controller");    return;    };    // ------------ finally we can check for the controlers ------------    meta.ctrllayer = ctrllayer;    meta.ctrlname = ctrllayer.name;    win.field_ctrlname.text = meta.ctrlname;    meta.ctrlExists = true;    win.checkbox_ctrlExists.value = meta.ctrlExists;};win.checkbox_simple.onClick = function (){    if(this.value == true){            win.panel_advanced.visible = false;    win.panel_advanced.enabled = false;    win.bounds = [0,0,260,100];        }else if (this.value == false){    win.field_amp.notify();    win.field_freq.notify();    win.panel_advanced.visible = true;    win.panel_advanced.enabled = true;    win.bounds = [0,0,260,315];            };    meta.simple = this.value;    };// end of simple checkbox functionwin.checkbox_addloop.onClick = function(){     meta.addLoop = this.value; };win.checkbox_addpstrz.onClick = function(){     meta.addPosterizeTime = this.value; };win.checkbox_usetemporal.onClick = function(){     meta.addTemporal = this.value; };win.checkbox_addseed.onClick = function(){     meta.addSeedRandom = this.value; };win.checkbox_addtime.onClick = function(){        if(this.value == true){            win.field_time.text = meta.time_expr;            meta.addTime = this.value;        }else if(this.value == false){            win.field_time.text = meta.t;            meta.addTime = this.value;        };};win.checkbox_ctrlExists.onClick = function() {    meta.ctrlExists = this.value;    if(this.value == false){        meta.ctrllayer = null;        meta.ctrlname = meta.defaultctrlname;    };};win.button_reset.onClick = function(){    meta.freq =  meta.freq_def;    win.field_freq.text = meta.freq_def;     win.field_freq.notify();    meta.amp = meta.amp_def;    win.field_amp.text = meta.amp_def;    win.field_amp.notify();    meta.seed = meta.seed_def;    win.field_seed.text = meta.seed_def;    win.field_seed.notify();     meta.octaves = meta.octaves_def;    win.field_octaves.text = meta.octaves_def;    win.field_octaves.notify();    meta.amp_mult = meta.amp_mult_def;    win.field_amp_mult.text = meta.amp_mult_def;    win.field_amp_mult.notify();    meta.t = meta.t_def;    win.field_time.text = meta.default_time_expr;    win.field_time.notify();    meta.time_expr = meta.default_time_expr;    meta.default_time_expr = "time";    meta.framesPerSecond = meta.framesPerSecond_def;    win.field_pstrz_fps.text = meta.framesPerSecond_def;    win.field_pstrz_fps.notify();    meta.loopTime = meta.loopTime_def;    win.field_looptime.text = meta.loopTime_def;    win.field_looptime.notify();    };}; // end if if win != null return win    }; // end of build UIfunction helpDialog(helpText , title ,win , meta){    var diag                = new Window ("dialog",title + "");    diag.preferredSize  =    {"width":450,"height":450};var pan                 = diag.add('group',undefined,'');    pan.orientation     ='column';var txt                 = pan.add('edittext',undefined,helpText,{multiline:true,scrolling: true});    txt.preferredSize   =    {"width":440,"height":430};var btg                 =  pan.add ("group");var cbg                 = btg.add ("group");    cbg.alignment       = "left";// var reset_button        = cbg.add ("button", undefined, "Reset Values to default");    btg.orientation     = 'row';    btg.alignment       = "right";    btg.add ("button", undefined, "OK");    btg.add ("button", undefined, "cancel");    if (diag.show () == 1){    return true;  }else{      return false;  };};function licenseDiag (n) {    var lic= "DONT USE SCRIPTS FROM UNTRUSETED SOURCES! ALWAYS DOWNLOAD THIS SCRIPT @ AESCRIPTS.COM http://aescripts.com/aemap/\n\n"+    "You have to allow the script to read and write to disk.\nso if you obtained this script from any other source then the above mentioned"+"\nIT COULD INCLUDE MALICIOUS CODE!\nBy confirming this dialog you also accept the license agreement below\n"+    "\nLICENSES\n"+"countries.geo.json and countries.zip and all its contents are UNLICENSED.\nSee also http://unlicense.org\n\n"+"Copyright (c)  2012 Fabian \"fabiantheblind\" Morón Zirfas\n"+"Permission is hereby granted, free of charge*, to any person obtaining a copy of this "+"software and associated documentation files (the \"Software\"), to deal in the Software "+ "without restriction, including without limitation the rights to use, copy, modify "+ "the Software, and to permit persons to whom the Software is furnished to do so, subject to the following "+"conditions:\n"+"The above copyright notice and this permission notice shall be included in all copies "+ "or substantial portions of the Software.\n"+"THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, "+ "INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A "+ "PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT "+ "HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF "+ "CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE "+"OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n"+"see also http://www.opensource.org/licenses/mit-license.php\n\n"+"*if you want to donate something so I can buy cookies and beer\ndo it via aescripts.com\n";var diag                = new Window ("dialog",n + " || readme and license agreement");    diag.preferredSize  =    {"width":450,"height":450};var pan                 = diag.add('group',undefined,'');    pan.orientation     ='column';var txt                 = pan.add('edittext',undefined,lic,{multiline:true,scrolling: false});    txt.preferredSize   =    {"width":440,"height":430};var btg                 =  pan.add ("group");var cbg                 = btg.add ("group");    cbg.alignment       = "left";var cb                  = cbg.add ("checkbox", undefined, "dont warn me again");    btg.orientation     = 'row';    btg.alignment       = "right";    btg.add ("button", undefined, "OK");    btg.add ("button", undefined, "cancel");if (diag.show () == 1){    return [cb.value,true];  }else{      return [false, false];  };};function resetValIfNAN(val, resetVal, theErrorMessage){      if(isNaN(val) == true){    val = resetVal;    alert(theErrorMessage);    };  return val;};    //  ______ _   _ _____     ____  ______     // |  ____| \ | |  __ \   / __ \|  ____|    // | |__  |  \| | |  | | | |  | | |__       // |  __| | . ` | |  | | | |  | |  __|      // | |____| |\  | |__| | | |__| | |         // |______|_| \_|_____/   \____/|_|                       //  _    _ _____     // | |  | |_   _|    // | |  | | | |      // | |  | | | |      // | |__| |_| |_     //  \____/|_____|                  /** *  This is the main function where everything gets processed *   */ function main_script(meta){app.beginUndoGroup("whihihiggle");    var curComp = app.project.activeItem;    if (!curComp || !(curComp instanceof CompItem))    {        alert("Please select a Composition.");        return;    };    var theExpression = buildExpression(meta);    var props = new Array(); app.beginSuppressDialogs();// dont want any warnings    var myLayers = curComp.selectedLayers;    if(myLayers.length > 0){        for (var i = 0; i < myLayers.length; i++){            var lprops = myLayers[i].selectedProperties;        for(var j = 0; j < lprops.length; j++){            props.push(lprops[j]);          };        };if((!meta.ctrlExists)&&(meta.simple == false)) createController(curComp, meta);for (var i = props.length - 1; i >= 0; i--) {  p = props[i];              if(p.canSetExpression == true){                try{                p.expression = theExpression.join("\n");                p.expressionEnabled = true;                }catch(e){                p.expressionEnabled = false;                alert("There is an error in the expression.\nI will disable it. Sry mate.");                };            };}; app.endSuppressDialogs(false);}else{    if((!meta.ctrlExists)&&(meta.simple == false)) createController(curComp, meta);    // alert("Please select at least one layer.");    return;    };app.endUndoGroup();}function buildExpression (meta) {var theExpression = new Array();if(meta.simple ==false){theExpression.push("layer = thisComp.layer('"+ meta.ctrlname +"'); // <-- THE CONTROL LAYER");theExpression.push("\n/* ------------------------------- */\n");theExpression.push("\n/* -----THE SLIDER CONTROLS------- */\n");theExpression.push("freq = layer.effect('freq')('ADBE Slider Control-0001');");theExpression.push("amp = layer.effect('amp')('ADBE Slider Control-0001');");theExpression.push("seed = layer.effect('seed')('ADBE Slider Control-0001');");theExpression.push("octaves = layer.effect('octaves')('ADBE Slider Control-0001');");theExpression.push("amp_mult = layer.effect('amp_mult')('ADBE Slider Control-0001');");theExpression.push("t = layer.effect('t')('ADBE Slider Control-0001');");theExpression.push("framesPerSecond = layer.effect('framesPerSecond')('ADBE Slider Control-0001');");theExpression.push("loopTime = layer.effect('loopTime')('ADBE Slider Control-0001');\n");theExpression.push("\n/* ------------------------------- */\n");var seed = "// seedRandom(seed);\r";if(meta.addSeedRandom){    seed = seed.substring(3);};theExpression.push(seed);var posterize = "// posterizeTime(framesPerSecond);\n";if((meta.addPosterizeTime == true)&&(meta.addLoop == false)){    posterize = posterize.substring(3);};theExpression.push(posterize);var theWiggle = "";var theTemporalWiggle = "";if(meta.addPosterizeTime == true){        theTemporalWiggle = "// temporalWiggle(freq, amp,octaves, amp_mult);\n";         theWiggle = "// wiggle(freq,amp,octaves, amp_mult)\n";      }else if(meta.addPosterizeTime == false){        theWiggle = "// wiggle(freq,amp,octaves,amp_mult,t)\n";        theTemporalWiggle = "// temporalWiggle(freq, amp, octaves, amp_mult, t);\n";};if(meta.addLoop == false){    if(meta.addTemporal == true){        theTemporalWiggle = theTemporalWiggle.substring(3);    }else if(meta.addTemporal == false){        theWiggle = theWiggle.substring(3);    };};theExpression.push(theWiggle);theExpression.push(theTemporalWiggle);theExpression.push("\n/* ------------------------------- */\n");theExpression.push("// Thanx to Dan Ebberst");theExpression.push("// Expressionieer's Designer Guide");theExpression.push("// Loop wiggle()");theExpression.push("// http://www.motionscript.com/design-guide/looping-wiggle.html\n");var loop_l1 = "// tLooped = t % loopTime;";var loop_l2 = "// wiggle1 = wiggle(freq, amp, octaves, amp_mult, tLooped);";var loop_l3 = "// wiggle2 = wiggle(freq, amp, octaves, amp_mult, tLooped - loopTime);";var loop_l4 = "// linear(tLooped, 0,  loopTime, wiggle1, wiggle2)";if (meta.addLoop == true) {    loop_l1 = loop_l1.substring(3);    loop_l2 = loop_l2.substring(3);    loop_l3 = loop_l3.substring(3);    loop_l4 = loop_l4.substring(3);};theExpression.push(loop_l1);theExpression.push(loop_l2);theExpression.push(loop_l3);theExpression.push(loop_l4);theExpression.push("\n/* ------------------------------- */\n");theExpression.push("// created with whihihiggle script by fabiantheblind\n// checkout --> " + meta.theWebsite +"\n\n");}else{    var f = meta.freq;    var a = meta.amp;    // if(meta.freq_is_expr == true){    //     f = meta.simple_freq_expr;     // };    // if(meta.amp_is_expr == true){    //     a = meta.simple_amp_expr;    // };    if(meta.addTemporal == false){        theExpression.push("wiggle("+f+","+a+")");    }else if(meta.addTemporal == true){        theExpression.push("temporalWiggle("+f+","+a+")");    };}    return theExpression;}function createController(curComp, meta){    var ctrl = curComp.layers.addNull();    ctrl.name = meta.ctrlname;    ctrl.source.name = meta.ctrlname;addSliderWithValueOrExpression(ctrl, "freq", meta.freq);addSliderWithValueOrExpression(ctrl, "amp", meta.amp);addSliderWithValueOrExpression(ctrl, "seed", meta.seed);addSliderWithValueOrExpression(ctrl, "octaves", meta.octaves);addSliderWithValueOrExpression(ctrl, "amp_mult", meta.amp_mult);var t = ctrl("ADBE Effect Parade").addProperty("ADBE Slider Control");    t.name = "t";    t.property("ADBE Slider Control-0001").setValue(meta.t);    if (meta.addTime){        try{                t.property("ADBE Slider Control-0001").expression = meta.time_expr;                t.property("ADBE Slider Control-0001").expressionEnabled = true;            }catch(e){                alert("Your time expression is not working.\n I will fall back to a basic 'time' as expression");                t.property("ADBE Slider Control-0001").expression = meta.default_time_expr;                t.property("ADBE Slider Control-0001").expressionEnabled = true;            };    };addSliderWithValueOrExpression(ctrl, "framesPerSecond", meta.framesPerSecond);addSliderWithValueOrExpression(ctrl, "loopTime", meta.loopTime);};/** *  This function creates a slider on the given controller *  it uses try catch to fall back onto an disabled expression if it is not valid code */ function addSliderWithValueOrExpression(ctrl, sliderName, metaObject ){var slider = ctrl("ADBE Effect Parade").addProperty("ADBE Slider Control");    slider.name = sliderName;    try{    slider.property("ADBE Slider Control-0001").setValue(parseFloat (metaObject));    }catch(e){        try{        slider.property("ADBE Slider Control-0001").expression = metaObject;        slider.property("ADBE Slider Control-0001").expressionEnabled = true;        }catch(e){        slider.property("ADBE Slider Control-0001").expressionEnabled = false;        alert(errorStrings.expressionNotValid(sliderName));        };    };};}