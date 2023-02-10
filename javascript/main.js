
document.getElementById("ID_form1bdb2a7e_weblogin_submit").onclick = function (ev) {
	ev = ev || window.event;
	r = Nwa_SubmitForm("form1bdb2a7e_weblogin","ID_form1bdb2a7e_weblogin_submit");
	ev.returnValue = r;
	return r;
}

function are_cookies_enabled()
{
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
    {
        document.cookie="testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
}
if (!are_cookies_enabled()) {
    alert("Your browser does not have cookies enabled.  Certain convenience features on this site require cookies.  Please enable cookies in your browser preferences.");
}

function Nwa_FocusFormAuto() {
    return Nwa_FocusForm("form1bdb2a7e_weblogin", "user", false);
}
if (typeof(addLoadEvent) == 'function') {
    addLoadEvent(Nwa_FocusFormAuto);
} else {
    Nwa_FocusFormAuto();
}

function Nwa_SetFieldEnabled(id, enable) {
	if (document.getElementById) {
		return Nwa_SetInputEnabled(document.getElementById(id), enable);
	}
}
function Nwa_SetInputEnabled(input, enable) {
	var o = input;
	if (o) {
		o.disabled = ! enable;
		if (o.length) {
			for (var i = 0; i < o.length; i++) {
				o[i].disabled = ! enable;
			}
		}
	}
}

function Nwa_SetOnChange(id, onchange) {
	if (document.getElementById) {
		var o = document.getElementById(id);
		if (o) o.onchange = onchange;
	}
}

function Nwa_SetOnBlur(id, onblur) {
	if (document.getElementById) {
		var o = document.getElementById(id);
		if (o) o.onblur = onblur;
	}
}

function Nwa_SetOnFocus(id, onfocus) {
	if (document.getElementById) {
		var o = document.getElementById(id);
		if (o) o.onfocus = onfocus;
	}
}

function Nwa_SetOnKeyUp(id, onkeyup) {
	if (document.getElementById) {
		var o = document.getElementById(id);
		if (o) o.onkeyup = onkeyup;
	}
}

function Nwa_SetOnKeyDown(id, onkeydown) {
	if (document.getElementById) {
		var o = document.getElementById(id);
		if (o) o.onkeydown = onkeydown;
	}
}

function Nwa_SetOnKeyPress(id, onkeypress) {
	if (document.getElementById) {
		var o = document.getElementById(id);
		if (o) o.onkeypress = onkeypress;
	}
}

function Nwa_SetOnClick(id, onclick) {
	if (document.getElementById) {
		var o = document.getElementById(id);
		if (o) o.onclick = onclick;
	}
}



document.form1bdb2a7e_weblogin.Nwa_OnFieldsChanged = function () {
	var form;
	try {

		form = document.getElementById("form1bdb2a7e_weblogin");
		if (typeof(form) !== 'object' || form === null) {
			return;
		}
		with (form) {
			Nwa_SetStyleDisplay("TR_form1bdb2a7e_weblogin_user", no_u.value != "1");
			Nwa_SetStyleDisplay("TR_form1bdb2a7e_weblogin_password", no_p.value != "1");
			Nwa_SetFieldEnabled("ID_form1bdb2a7e_weblogin_submit", (no_login.value == "") && ((typeof(loginTermsOK) == "function") ? loginTermsOK() : ((typeof(visitor_accept_terms) == "undefined") || visitor_accept_terms.checked)) && (user.value != "" || no_p.value == "1"));

		}
	} catch (e) {
		alert("Internal form error: problem with element 'visible_if' or 'enable_if': " + e.message)
	}
}
with (document.form1bdb2a7e_weblogin) {

	for (var i = 0; i < elements.length; ++i) {
		if (elements[i].id.substr(0, 3) == 'ID_') {
			if (elements[i].type == 'checkbox' || elements[i].type == 'radio') {
				elements[i].onclick = function (event) {
					document.form1bdb2a7e_weblogin.Nwa_OnFieldsChanged(event);
				}
			} else {
				elements[i].onchange = function (event) {
					document.form1bdb2a7e_weblogin.Nwa_OnFieldsChanged(event);
				}
			}
			if (elements[i].type == 'select-one') {

				elements[i].onkeyup = function (event) {
					document.form1bdb2a7e_weblogin.Nwa_OnFieldsChanged(event);
				}
			}
		}
	}
}

document.form1bdb2a7e_weblogin.Nwa_OnFieldsChanged();
addLoadEvent(function () {window.setTimeout(function () {document.form1bdb2a7e_weblogin.Nwa_OnFieldsChanged()}, 750);}); // Call again after a short delay to catch auto-fill.




// -->