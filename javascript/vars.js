var _form_name = "form1bdb2a7e_weblogin";
function Nwa_Number00(num) {
	var s = num.toString();
	if (s.length == 1) {
		s = '0' + s;
	}
	return s;
}


function Nwa_FloatFormat(num, f) {
    f = parseInt(f / 1 || 0);
    if (f < 0 || f > 20) {
        alert("The number of fractional digits is out of range");
    }
    if (isNaN(num)) {
        return "NaN";
    }
    var s = num < 0 ? "-" : "", x = Math.abs(num);
    if (x > Math.pow(10, 21)) {
        return s + x.toString();
    }
    var m = Math.round(x * Math.pow(10, f)).toString();
    if (!f) {
        return s + m;
    }
    while (m.length <= f) {
        m = "0" + m;
    }
    return s + m.substring(0, m.length - f) + "." + m.substring(m.length - f);
}

function Nwa_AdjustTimeZone(time) {
	// Copyright 1999, 2000 by Ray Stott
	// OK to use if this copyright is included
	// Script available at http://www.crays.com/jsc
	var TimezoneOffset = 3600
	var ms = time + (new Date().getTimezoneOffset() * 60000) + TimezoneOffset * 1000
	return new Date(ms)
}


function Nwa_ParseTimestamp(timestamp) {
    var t_len = timestamp.length;
    var year = parseInt(timestamp.substr(0,4), 10);
    var month = parseInt(timestamp.substr(5,2), 10) - 1;
    var day = parseInt(timestamp.substr(8,2), 10);
    var hour = t_len >= 13 ? parseInt(timestamp.substr(11,2), 10) : 0;
    var min = t_len >= 16 ? parseInt(timestamp.substr(14,2), 10) : 0;
    var sec = t_len >= 19 ? parseInt(timestamp.substr(17,2), 10) : 0;
    var d = new Date(year, month, day, hour, min, sec);
    return d;
}


function Nwa_DateFormat(time, format) {
	time = parseInt(time);
	if (isNaN(time)) {
		return "N.v.t.";
	}
	var t = Nwa_AdjustTimeZone(time * 1000);
	var s = format;

	s = s.replace("%h", "%b");
	s = s.replace("%D", "%m/%d/%y");
	s = s.replace("%r", "%l:%M %p");
	s = s.replace("%T", "%H:%M:%S");
	s = s.replace("%R", "%H:%M");
	s = s.replace("%Y", t.getFullYear());
	s = s.replace("%y", Nwa_Number00(t.getFullYear() % 100));
	s = s.replace("%x", t.toLocaleDateString());
	s = s.replace("%X", t.toLocaleTimeString());
	s = s.replace("%w", t.getDay()); // 0=sunday
	s = s.replace("%S", Nwa_Number00(t.getSeconds()));
	s = s.replace("%m", Nwa_Number00(t.getMonth() + 1));  // 01-12
	s = s.replace("%M", Nwa_Number00(t.getMinutes())); // 00-59
	s = s.replace("%H", Nwa_Number00(t.getHours())); // 00-23
	s = s.replace("%I", Nwa_Number00(t.getHours() == 0 ? 12 : t.getHours() > 12 ? t.getHours() - 12 : t.getHours())); // 01-12
	s = s.replace("%l", t.getHours() == 0 ? 12 : t.getHours() > 12 ? t.getHours() - 12 : t.getHours()); // 1-12
	s = s.replace("%a", (typeof(Calendar._SDN) !== 'undefined') ? Calendar._SDN[t.getDay()] : Calendar._DN[t.getDay()].substring(0, typeof(Calendar._SDN_len) === 'undefined' ? 3 : Calendar._SDN_len)); // abbreviated weekday name
	s = s.replace("%A", Calendar._DN[t.getDay()]); // full weekday name
	s = s.replace("%b", (typeof(Calendar._SMN) !== 'undefined') ? Calendar._SMN[t.getDay()] : Calendar._MN[t.getDay()].substring(0, typeof(Calendar._SMN_len) === 'undefined' ? 3 : Calendar._SMN_len)); // abbreviated  month name
	s = s.replace("%B", Calendar._MN[t.getMonth()]); // full month name
	s = s.replace("%c", t.toLocaleString());
	s = s.replace("%d", Nwa_Number00(t.getDate())); // 01-31
	s = s.replace("%e", (t.getDate() < 10 ? ' ' + t.getDate() : t.getDate())); // " 1"-"31"
	s = s.replace("%p", (t.getHours() >= 12 ? "PM" : "AM"));
	s = s.replace("%C", Nwa_Number00((t.getFullYear() - t.getFullYear() % 100) / 100));
	s = s.replace("%u", t.getDay() ? t.getDay() : 7); // 7=sunday, 1=monday
	s = s.replace("%%", "%");
	return s;
}

function Nwa_MinutesToNatural(mins) {
	var str;
	mins = parseInt(mins)
	if (isNaN(mins)) {
		return "N.v.t.";
	} else if (mins > 1440) {
		var days = Math.round(mins/144)/10
		if (Math.abs(days - 1) < 1.0e-6) {
			str = "@DAYS@ dag".replace('@DAYS@', days)
		} else {
			str = "@DAYS@ dagen".replace('@DAYS@', days)
		}
	} else if (mins >= 120) {
		var hours = Math.floor(mins/60)
		if (Math.abs(hours - 1) < 1.0e-6) {
			str = "@HOURS@ uur".replace('@HOURS@', hours)
		} else {
			str = "@HOURS@ uur".replace('@HOURS@', hours)
		}
	} else {
		if (Math.abs(mins - 1) < 1.0e-6) {
			str = "@MINUTES@ minuut".replace('@MINUTES@', mins)
		} else {
			str = "@MINUTES@ minuten".replace('@MINUTES@', mins)
		}
	}
	return str
}

function Nwa_SecondsToNatural(seconds) {
    if (Math.abs(seconds) < 60) {
        seconds = parseInt(Math.abs(seconds));
        if (seconds == 1) {
            return "1 seconde";
        } else {
            return "@SECONDS@ seconden".replace('@SECONDS@', seconds);
        }
    }
	mins = parseInt(seconds) / 60;
	return Nwa_MinutesToNatural(mins);
}

function Nwa_SecondsToRemaining(t) {
    var exp = '';
    if (t > 86400) {
        var d = Math.floor(t / 86400);
        if (d == 1) {
            exp += "1 dag";
        } else {
            exp += "%1 dagen".replace(/%1/, d);
        }
        t -= d * 86400;
    }
    if (t > 3600) {
        if (exp != '') {
            exp += ' ';
        }
        var h = Math.floor(t / 3600);
        if (h == 1) {
            exp += "1 uur";
        } else {
            exp += "%1 uur".replace(/%1/, h);
        }
        t -= h * 3600;
    }
    if (t > 60) {
        if (exp != '') {
            exp += ' ';
        }
        var m = Math.floor(t / 60);
        if (m == 1) {
            exp += "1 minuut";
        } else {
            exp += "%1 minuten".replace(/%1/, m);
        }
        t -= m * 60;
    }
    if (t > 0) {
        if (exp != '') {
            exp += ' ';
        }
        var s = t;
        if (s == 1) {
            exp += "1 seconde";
        } else {
            exp += "%1 seconden".replace(/%1/, s);
        }
        t -= s;
    }
	return exp;
}


function Nwa_TimestampToNatural(timestamp, do_neg, base_timestamp) {
    var now = new Date();
    if (base_timestamp) {
        now = Nwa_ParseTimestamp(base_timestamp);
    }
    now = now.getTime();
    timestamp = Nwa_ParseTimestamp(timestamp);
    timestamp = timestamp.getTime();
	var mins = (timestamp - now) / 1000 / 60;
    var negative = do_neg && (mins < 0);
    if (negative) {
        mins = mins * -1;
    }
	var str = Nwa_MinutesToNatural(mins);;
    if (negative) {
        str = '-' + str;
    }
	return str
}


function Nwa_TextCounter(field, cntfield, maxlimit) {
    var o = document.getElementById(cntfield);
    if (!o) {
        return;
    }

    var counter = '';
    if (maxlimit == 1) {

        counter = "@COUNT@ tekens".replace('@COUNT@', field.value.length);
    } else {
        var cap = false;
        if (maxlimit < 0) {
            cap = true;
            maxlimit = Math.abs(maxlimit);
        }
        var delta = maxlimit - field.value.length;
        if (delta < 0) {
            delta = Math.abs(delta);
            if (cap) {
                field.value = field.value.substring(0, maxlimit);
                counter = "0 tekens resterend";
            } else if (delta == 1) {
                counter = "1 teken resterend";
            } else {
                counter = "@DELTA@ tekens resterend".replace('@DELTA@', delta);
            }
        } else if (delta == 1) {
                counter = "1 teken resterend";
        } else {
            counter = "@DELTA@ tekens resterend".replace('@DELTA@', delta);
        }
    }
    o.innerHTML = counter;
}


function Nwa_PrivatePasswordOnFocus(pw_v) {
    var pw_id = pw_v.id;
    var flag = document.getElementById('F_' + pw_id);
    if (!flag) return;

    if (flag.value == '1' || flag.value == '2') {
        pw_v.value='';
    } else {
        var val_field = document.getElementById('V_' + pw_id);
        if (!val_field) return;
        pw_v.value=val_field.value;
    }
    return false;
}


function Nwa_PrivatePasswordOnChange(pw_v) {
    var pw_id = pw_v.id;
    var flag = document.getElementById('F_' + pw_id);
    if (!flag) return;
    if (pw_v.value != '' || flag.value == '0') {
        var val_field = document.getElementById('V_' + pw_id);
        if (val_field) {
            val_field.value = pw_v.value;
        }
    }
    
    return false;
}


function Nwa_PrivatePasswordOnBlur(pw_v) {
    var pw_id = pw_v.id;
    var flag = document.getElementById('F_' + pw_id);
    if (!flag) return;
    if (pw_v.value == '') {
        if (flag.value == '1') {
            pw_v.value = "\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf";
        } else if (flag.value == '2') {
            pw_v.value = "p_\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf";
        }
    } else {
        flag.value = '0';
    }
    var val_field = document.getElementById('V_' + pw_id);
    if (!val_field) return; // Confirm not a secure field, and no cache
    if (val_field.value != '') {
        pw_v.value = "\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf";
    }
    
    return false;
}



function Nwa_EnableFormButtons(form_name) {
	var f = document.getElementById(form_name)
	if (f) {
		try {
			for (var i = 0; i < f.elements.length; ++i) {
				var e = f.elements[i]
				if (e.type == 'button' || e.type == 'submit') {
					e.disabled = false;
					if (e.value_saved)
						e.value = e.value_saved;
				}
			}
		} catch (e) {

		}
	}
}

function Nwa_DisableFormButtons(form_name, submit_id, do_enable) {
	var f = document.getElementById(form_name)
	if (f) {
		try {
			for (var i = 0; i < f.elements.length; ++i) {
				var e = f.elements[i]
				if (e.type == 'button' || e.type == 'submit') {
					e.disabled = true;
					if (e.id == submit_id) {
						e.value_saved = e.value;
						e.value = 'aan het verwerken...';
					}
				}
			}
		} catch (e) {

		}
	}
}

if (typeof(Nwa_SubmitForm) !== 'function') {
	
	Nwa_SubmitForm = function (form_name, submit_id) {
		Nwa_DisableFormButtons(form_name, submit_id)
		var f = document.getElementById(form_name)
		if (f) {
			if (typeof(document[form_name].Nwa_OnSubmit) == "function" && !document[form_name].Nwa_OnSubmit(form_name)) {
                Nwa_EnableFormButtons(form_name);
				return false;
			}
			if (!Nwa_SubmitForm.CallHooks(form_name, submit_id)) {
				Nwa_EnableFormButtons(form_name);
				return false;
			}
			f.submit()
		}
		return false
	}
	Nwa_SubmitForm.hooks = [];
	Nwa_SubmitForm.AddHook = function(hook) {
		Nwa_SubmitForm.hooks.push(hook);	
	}
	Nwa_SubmitForm.CallHooks = function(form_name, submit_id) {
		if (typeof(Nwa_SubmitForm.hooks) == "object") {
			for (var i in Nwa_SubmitForm.hooks) {
				if (typeof(Nwa_SubmitForm.hooks[i]) == "function" && !(Nwa_SubmitForm.hooks[i])(form_name, submit_id)) {
					return false;
				}
			}
		}
		return true;
	}
}

function Nwa_FocusForm(form_name, element_name, force_focus) {
	var f = document.getElementById(form_name), hash = self.document.location.hash;
	if (!force_focus && hash) {

		if (hash.indexOf('#A_') === 0) {
			hash = hash.substring(3);
		}
	}
	for (var i = 0; i < f.elements.length; ++i) {
		var e = f.elements[i];
		if (e.type == "hidden") {
			continue;
		}
		if (hash && (e.name == hash || e.name == hash + '[]')) {
			try { e.focus(); } catch (ex) { } 
			if (typeof(e.select) == "function") e.select();
			break;
		} else if (e.name == element_name || e.name == element_name + '[]') {
			try { e.focus(); } catch (ex) { } 
			if (typeof(e.select) == "function") e.select();
			if (!hash) break;
		}
	}
}


if (typeof(Nwa_AjaxSubmitForm) !== 'function') {
	
	Nwa_AjaxSubmitForm = function (form_name, submit_id, callback) {
		if (typeof(callback) == "function") {
			Nwa_DisableFormButtons(form_name, submit_id)
			if (!Nwa_AjaxSubmitForm.CallHooks(form_name, submit_id)) {
				Nwa_EnableFormButtons(form_name);
				return false;
			}
			if (callback(form_name, Nwa_GetFormPostData(form_name))) {
                var f = document.getElementById(form_name)
                if (f) {
                    f.submit()
                } else {
                    return true; // WTF?
                }
            } else {
                Nwa_EnableFormButtons(form_name);
            }
            return false;
		} else {
			return Nwa_SubmitForm(form_name, submit_id)
		}
	}
	Nwa_AjaxSubmitForm.hooks = [];
	Nwa_AjaxSubmitForm.AddHook = function(hook) {
		Nwa_AjaxSubmitForm.hooks.push(hook);	
	}
	Nwa_AjaxSubmitForm.CallHooks = function(form_name, submit_id) {
		if (typeof(Nwa_AjaxSubmitForm.hooks) == "object") {
			for (var i in Nwa_AjaxSubmitForm.hooks) {
				if (typeof(Nwa_AjaxSubmitForm.hooks[i]) == "function" && !(Nwa_AjaxSubmitForm.hooks[i])(form_name, submit_id)) {
					return false;
				}
			}
		}
		return true;
	}
}
