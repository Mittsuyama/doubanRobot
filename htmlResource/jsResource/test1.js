function load_event_monitor(root)
{
    var re = / a_(\w + ) /,
    fns = {};
    $(".j", root).each(function (i)
    {
        var m = re.exec(this.className);
        if (m)
        {
            var actionName = m[1],
            f = fns[actionName];
            f || (f = eval("Douban.init_" + actionName), fns[actionName] = f),
            f && f(this)
        }
    }
    )
}
function request_log_ad_displays()
{
    $('div[id^="daslot"]').each(function (t)
    {
        var e = $(this).attr("id");
        params = e.split("-"),
        $.get("/j/da/view?da=" + params[1] + "&dag=" + params[2] + "&dac=" + params[3] + "&p=" + params[4] + "&kws=" + params[5])
    }
    )
}
function ext_links()
{
    es = $(".entry-summary"),
    es.each(function (t)
    {
        var e = $(es[t]).find("a");
        e.each(function (t)
        {
            e[t].target = "_blank"
        }
        )
    }
    )
}
function get_cookie(t)
{
    for (var e = t + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++)
    {
        for (var o = n[i]; " " == o.charAt(0); )
            o = o.substring(1, o.length);
        if (0 == o.indexOf(e))
            return o.substring(e.length, o.length).replace(/ \"/g, "")
    }
    return null
}
function clean_tip()
{
    var t = $("#page_focus")[0];
    return t && t.value != t.title
}
function _moreurl(t, e)
{
    var n = ["ref=" + encodeURIComponent(location.pathname)];
    for (var i in e)
        e.hasOwnProperty(i) && n.push(i + "=" + e[i]);
    window._SPLITTEST && n.push("splittest=" + window._SPLITTEST),
    localStorage.setItem("report", (localStorage.getItem("report") || "") + "_moreurl_separator_" + n.join("&"))
}
function delete_reply_notify(t)
{
    return delete_reply_notify.id || (delete_reply_notify.id = t, show_dialog($("#confirm_delete").html(), 280), $("#overlay").css("z-index", 100), $("#dialog .submit").eq(0).focus()),
    !1
}
function close_delete(t)
{
    if (t)
    {
        var e = delete_reply_notify.id;
        $.get("/j/accounts/remove_notify?id=" + e),
        $("#reply_notify_" + e).fadeOut()
    }
    delete_reply_notify.id = null,
    close_dialog()
}
function tip_win(t)
{
    $(t).next(".blocktip").show().blur_hide()
}
function js_parser(htm)
{
    for (var tag = "script>", begin = "<" + tag, end = "</" + tag, pos = pos_pre = 0, result = script = ""; (pos = htm.indexOf(begin, pos)) + 1 && (result += htm.substring(pos_pre, pos), pos += 8, pos_pre = htm.indexOf(end, pos), !(pos_pre < 0)); )
        script += htm.substring(pos, pos_pre) + ";", pos_pre += 9;
    return result += htm.substring(pos_pre, htm.length),
    {
        htm : result,
        js : function ()
        {
            eval(script)
        }
    }
}
function center(t)
{
    return
    {
        left : (document.document
            Element.offsetWidth - t.offsetWidth) / 2 + "px",
        top : .45 * (document.documentElement.clientHeight - t.offsetHeight) + "px"
    }
}

function pop_win(t, e)
{
    if (!window.__pop_win)
    {
        var n = document.createElement("div");
        n.className = "pop_win_bg",
        document.body.appendChild(n);
        var i = document.createElement("div");
        i.className = "pop_win",
        document.body.appendChild(i),
        __pop_win =
        {
            bg : n,
            body : i,
            body_j : $(i),
            bg_j : $(n)
        }
    }
    var o = __pop_win.body,
    a = __pop_win.body_j,
    r = js_parser(t);
    e !== !0 && (r.htm = '<a onclick="pop_win.close()" href="javascript:; " class="pop_win_close">X</a>' + r.htm),
    o.innerHTML = r.htm,
    r.js();
    var s =
    {
        left : "50 % ",
        top : "50 % ",
        marginLeft :  - (o.offsetWidth / 2) + "px",
        marginTop :  - (o.offsetHeight / 2) + "px"
    };
    document.documentElement.clientHeight < o.offsetHeight && (s.top = "0", s.marginTop = "0", s.height = document.documentElement.clientHeight - 40 + "px", s.overflow = "auto"),
    a.css(
    {
        display : "block"
    }
    ).css(s).css(
    {
        visibility : "visible",
        zIndex : 9999
    }
    ),
    pop_win.fit(),
    window.XMLHttpRequest || (__pop_win.bg.style.top = "", __pop_win.bg.style.marginTop = "")
}

function event_init_tab()
{
    $("#tongcheng_tab").click(function ()
    {
        return $("#tongcheng_tab_block").is(":hidden") ? (show_tongcheng_tab(), $(document.body).click(function ()
            {
                hide_tongcheng_tab(),
                $(document.body).unbind("click", arguments.callee)
            }
            )) : hide_tongcheng_tab(),
        !1
    }
    )
}
function show_tongcheng_tab()
{
    $("#tongcheng_tab_block").show(),
    $("#tongcheng_tab span").addClass("up")
}
function hide_tongcheng_tab()
{
    $("#tongcheng_tab_block").hide(),
    $("#tongcheng_tab span").removeClass("up")
}
function exp_dialog(t)
{
    var e = document.documentElement;
    return 0 - parseInt(t.offsetHeight / 2) + (TBWindowMargin = e && e.scrollTop || document.body.scrollTop) + "px"
}
function exp_overlay(t)
{
    return 0 - parseInt(t.offsetHeight / 2) + (TBWindowMargin = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop) + "px"
}
function exp_sort_h2_over()
{
    this.style.backgroundColor = "#eeffee"
}
function exp_sort_h2_out()
{
    this.style.backgroundColor = ""
}
function getslider(t, e, n, i, o, a, r)
{
    var s = 5,
    c = 100,
    r = r || 5,
    l = 0,
    u = function (i)
    {
        s + i > c ? (s = c, t[0].className = "dis
                ") : s + i < 5 ? (s = 5, e[0].className = "dis") : s += i,
        e[0]
        .className = 5 == s ? "dis" : "",
        t[0].className = s == c ? "dis" : "",
        l = 105 * (5 - s),
        n.animate(
        {
            marginLeft : l + "px"
        },
        {
            duration : 60 * Math.abs(i)
        }
        )
    };
    return function (t)
    {
        s + t > r && r < c ? $.postJSON_withck(i,
        {
            start : r,
            pp : o,
            cat_id : a
        }, function (e)
        {
            e.err && (c = e.total, r += e.num, t = e.num, n.html(n.html() + e.more_html), u(t))
        }
        ) : u(t)
    }
}
!function ()
{
    var t = window.white_site_list || new RegExp(["^https ? : //([\\w]+\\.douban\\.com", "|web[0-9]?\\.qq\\.com", "|hao\\.qq\\.com", "|(hao\\.)*360\\.cn", "|so\\.com", "|www\\.soso\\.com", "|(www\\.)?growingio\\.com", ")(\\:[\\d]+)?/"].join(""));
    self !== top && document.referrer.search(t) === -1 && (top.location = self.location)
}
(), Do = "undefined" == typeof Do ? function (t)
{
    setTimeout(t, 0)
}
 : Do, Douban = {}, function ()
{
    function t()
    {
        var t =
        {
            done : [],
            fail : []
        },
        e =
        {
            done : function (n)
            {
                return t.done.push(n),
                e
            },
            fail : function (n)
            {
                return t.fail.push(n),
                e
            }
        };
        return
        {
            resolve : function ()
            {
                for (var e, n = 0; e = t.done[n++]; )
                    e.apply(this, arguments)
            },
            reject : function ()
            {
                for (var e, n = 0; e = t.fail[n++]; )
                    e.apply(this, arguments)
            },
            promise : e
        }
    }
    var e = function (t, n, i, o, a, r)
    {
        if (t)
        {
            "function" == typeof n && (o = n, n = ""),
            "function" == typeof i && (o = i, i = "");
            var s = function ()
            {
                e.loaded[t] = 1,
                o && o(t),
                o = null,
                clearTimeout(l)
            };
            if (e.loaded[t])
                return e.loading[t] && (e.loading[t] = 0), void setTimeout(function ()
                {
                    s()
                }, 0);
            if (e.loading[t])
                return void setTimeout(function ()
                {
                    e(t, n, i, o, a, r)
                }, 10);
            e.loading[t] = 1;
            var c,
            l = setTimeout(function ()
                {
                    try
                    {
                        r(t)
                    }
                    catch (t)
                    {}

                }, a || 6e3),
            u = n || t.toLowerCase().split(/\./).pop().replace(/[\?#].*/, "");
            "js" === u ? (c = document.createElement("script"), c.setAttribute("type", "text/javascript"), c.setAttribute("src", t), c.setAttribute("async", !0)) : "css" === u && (c = document.createElement("link"), c.setAttribute("type", "text/css"), c.setAttribute("rel", "stylesheet"), c.setAttribute("href", t)),
            i && (c.charset = i),
            "css" === u ? setTimeout(function ()
            {
                s()
            }, 0) : (c.onerror = function ()
            {
                s(),
                c.onerror = null
            }, c.onload = c.onreadystatechange = function ()
            {
                this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (setTimeout(function ()
                    {
                        s()
                    }, 0), c.onload = c.onreadystatechange = null)
            }
            );
            var d = functio
                n()
            {
                var t = document.getElementsByTagName("sc
                                                                ript");
                return t[t.length - 1]
            }
            ();
            d.parentNode.insertBefore(c, d)
        }
    };
    e.loaded = window.__external_files_loaded = window.__external_files_loaded || {},
    e.loading = window.__external_files_loading = window.__external_files_loading || {},
    e.batch = function ()
    {
        if (0 != arguments.length)
        {
            var n = Array.prototype.slice.call(arguments);
            "[object Array]" == Object.prototype.toString.call(n[0]) && (n = n[0]);
            for (var i, o = t(), a = [], r = function ()
            {
                a.pop(),
                0 === a.length && o.resolve()
            }, s = 0; i = n[s++]; )
                a.push(i), e(i, r);
            return o.promise
        }
    },
    Douban = window.Douban || {},
    Douban.loader = e
}
(), Douban.errdetail = ["", " ?? a ?? ￥é” ? èˉˉ", " ? – ?? ?? è ?? ? ¤§", " ?? ?? ? ˉ ?? ?? …¨", " ?? ?? ?? é” ? èˉˉ", " ?? ?? ± ? é” ? èˉˉ", " ? ”¨ ?? ·é” ? èˉˉ", " ?? ? é ?? ?? ? è ? 3", " ? 2 ?? ? ‰ ? – ?? ?? ", " ?? ?? - ?? – ?? ?? é” ? èˉˉ", " ?? ?? ”ˉ ?? ?? ?? ? – ?? ?? ? ?? ?? ", "è ? … ? — ? ", " ? – ?? ?? ? ?? ?? ?? ‰èˉˉ", "", " ? · ?? ? ? – ?? ?? ?? oé” ? ", " ? ·2 ?? ? è ?? ?? ° ?? 1é ?? ?? ? é ?? ", " ?? ?? - ?? ? ¨ ?? ?? ?? ?? ? ", " ?? é ? ¤ ? ¤±è′￥", "é” ? èˉˉ ?? ? MP3 ? – ?? ?? ", " ?? ‰ ? | ?? ”¨ ?? ?? ? … ?? 1, èˉ· ?? ?? ”1é ?? èˉ ? "];
var trace = function (t)
{
    !/^http:\/\/(www|movie|music\.|book|douban\.fm)/.test(location.href) && window.console && window.console.log && console.log(t)
}, report = function (t)
{
    $.get(" / j / report ? e = " + t)
};
Douban.EventMonitor = function ()
{
    this.listeners = new Object
}, Douban.EventMonitor.prototype.broadcast = function (t, e, n)
{
    var i = this.listeners[e];
    if (null != i)
        for (var o in i)
            i[o](t, n)
}, Douban.EventMonitor.prototype.subscribe = function (t, e)
{
    var n = this.listeners[t];
    n ? n.push(e) : this.listeners[t] = [e]
}, Douban.EventMonitor.prototype.unsubscribe = function (t, e)
{
    var n = this.listener[t];
    null != n && (n = n.filter(function (t, n, i)
            {
                return t != e
            }
            ))
};
var event_monitor = new Douban.EventMonitor;
Douban.prettify_form = function (t)
{
    $("input : submit", t).each(function (e)
    {
        var n = $('<a href="#" class="butt"></a>').text($(this).val());
        n.click(function ()
        {
            return clean_tip() && t.submit(),
            !1
        }
        ),
        $(this).hide().after(n)
    }
    )
};
var get_form_fields = function (t)
{
    function e(t, e)
    {
        var i = n[t],
        o = typeof
            i;
        "string" == o ? n[t] = [i, e] : "object" == o ? n[t].push(e) : n[t] = e
    }
    var n = {};
    return $(":input", t).each(function (t)
    {
        var i = this.name,
        o = this.value;
        "radio" == this.type || "checkbox" == this.type ? this.checked && e(i, o) : "submit" == this.type ? /se
                                                        lected/.test(this.className) && (n[i] = o) : i && e(i, o),
        /notnull/.test(this.className) && "" == this.value && ($(this).prev().addClass("errnotnull"), n.err = "notnull")
    }
    ),
    n
}, remote_submit_json = function (t, e, n, i)
{
    var o = get_form_fields(t);
    if (void 0 == o.err)
    {
        n === !1 ? $(" : submit, : input", t).removeAttr("disabled") : $(" : submit, : input", t).attr("disabled", !0);
        var a = i || t.action;
        $.post_withck(a, o, function (t)
        {
            e(t)
        }, "json")
    }
};
Douban.init_evb = function (o)
{
    var eid = $(o).attr("id").split(" - ")[1];
    $(o).submit(function ()
    {
        var url = " / j / entry / " + eid + " / vote";
        return $.post_withck(url, function (ret)
        {
            var r = eval("(" + ret + ")");
            event_monitor.broadcast(this, "entry_" + eid + "_voted", r),
            $(o).text(" ?? ?? ?? ?? ? ￥¨ ? ·2 ?? ?? ?? ? o¤ ?? ? è°￠è°￠ ? € ? "),
            $("#nf-" + eid).hide(),
            $("#nf_s-" + eid).hide()
        }
        ),
        !1
    }
    )
}, Douban.init_evc = function (t)
{
    var e = $(t).attr("id").split("-")[1];
    event_monitor.subscribe("entry_" + e + "_voted", function (e, n)
    {
        var i = n.rec_count;
        i && $(t).text("" + i + "?oo??¨è??").removeClass("hidden")
    }
    )
}, Douban.init_enb = function (t)
{
    var e = $(t).attr("id").split("-")[1];
    $(t).submit(function ()
    {
        var n = "/j/entry/" + e + "/nointerest";
        return $.post_withck(n, function (n)
        {
            $(t).text("?? ???????￥¨?·2???????o¤???è°￠è°￠?€?"),
            $("#a_evb-" + e + ",#evb_s-" + e).hide()
        }
        ),
        !1
    }
    )
};
var voteuse_act = function (t, e, n, i)
{
    var o = "/j/" + n + "/" + e + (t ? "/useful" : "/useless");
    "www.douban.com" === window.location.hostsname && "discussion" === n && (o = "/event" + o),
    $.postJSON_withck(o, {}, function (t)
    {
        if (t.result)
            if (i)
            {
                var n = $("#ucount" + e + "u"),
                o = $("#ucount" + e + "l");
                n.text() == t.usecount && o.text() == t.totalcount - t.usecount && "notself" != t.result && alert("?? ?·2??????è???￥¨?o?"),
                n.html(t.usecount),
                o.html(t.totalcount - t.usecount)
            }
            else
                $("#voteuse_" + e).html('<span class="m gtleft">?? ???????￥¨?·2???????o¤???è°￠è°￠?€?</span>'), $("#userate_" + e).html('<p id="userate_%s" class="pl">' + t.usecount + "/" + t.totalcount + "????ooè§‰??—?-¤èˉ?è?o??‰?”¨:</p>");
        return !1
    }
    )
}, vote_type = function (t)
{
    switch (t)
    {
    case "d":
        return "doulist";
    case "r":
        return "review";
    case "c":
        return "discussion";
    case "s":
        return "song"
    }
}, voteuse
ful = function (t, e)
{
    var n = t.split("-"),
    i = vote_type(n[0]);
    return voteuse_act(!0, n[1], i, e)
}, voteuseless = function (t, e)
{
    var n = t.split(" - "),
    i = vote_type(n[0]);
    return voteuse_act(!1, n[1], i, e)
}, remove_movie_discussion = function (t, e)
{
    custome_bt = [
        {
            text : " ?? ? è ? ¤",
            method : function ()
            {
                window.location = t + "remove ? ck = " + e
            }
        },
        {
            text : " ?? – ?? ? ",
            method : function (t)
            {
                t.close()
            }
        }
    ];
    var n = dui.Dialog(
        {
            isHideClose : !0,
            title : " ?? ? è ? ¤ ?? é ? ¤",
            content : " ?? ?? ?? è | ?? ? é ? ¤è ?? ? ˉ ? è ? ¨è ? o ?? — ? ",
            width : 400,
            buttons : custome_bt
        }
        );
    n.open().update()
};
Douban.init_bef = function (t)
{
    var e = $(t).attr("id").split("entry - ")[1],
    n = $(".unfolder", t),
    i = $(".folder", t),
    o = $(".entry - summary", t),
    a = $(".entry - full", t);
    n.click(function ()
    {
        if ("" == a.text())
        {
            var r = $('<div class="loadtip">?-￡??¨è???…￥...</div>'),
            s = setTimeout(function ()
                {
                    $(".source", t).before(r)
                }, 200),
            c = " / j / entry / " + e + " / ";
            $.getJSON(c, function (t)
            {
                clearTimeout(s),
                r.hide(),
                $.post_withck(c + "view", {}

                ),
                a.html(t.content).find("a").attr("target", "_blank"),
                a.show(),
                o.hide()
            }
            )
        }
        else
            a.show(), o.hide();
        return n.hide(),
        i.show(),
        !1
    }
    ).hover_fold("unfolder"),
    i.click(function ()
    {
        o.show(),
        a.hide(),
        i.hide(),
        n.show()
    }
    ).hover_fold("folder")
}, Douban.init_unfolder_n = function (t)
{
    $(t).click(function ()
    {
        var e = $(t).attr("id").split(" - ")[1],
        n = " / j / note / " + e + " / full";
        return $.getJSON(n, function (t)
        {
            $("#note_" + e + "_short").hide(),
            $("#note_" + e + "_full").html(t.html),
            $("#note_" + e + "_full").show(),
            $("#note_" + e + "_footer").show(),
            $("#naf-" + e).hide(),
            $("#nau-" + e).show(),
            load_event_monitor($("#note_" + e + "_full"))
        }
        ),
        !1
    }
    ).hover_fold("unfolder")
}, Douban.init_folder_n = function (t)
{
    $(t).click(function ()
    {
        var e = $(t).attr("id").split("-")[1];
        $("#note_" + e + "_full").hide(),
        $("#note_" + e + "_short").show(),
        $("#note_" + e + "_footer").hide(),
        $(t).hide(),
        $("#naf-" + e).show()
    }
    ).hover_fold("folder")
}, Douban.init_unfolder = function (t)
{
    $(t).click(function ()
    {
        var e = t.id.split("-")[1],
        n = t.rel.split("-")[1],
        i = "/j/review/" + e + "/fullinfo";
        return $.ajaxSetup(
        {
            cache : !0
        }
        ),
        $.getJSON(i,
        {
            show_works : n
        }, function (t)
        {
            var n = document.createElement("div");
            n.innerHTML = t.html,
            $("#review_" + e + "_short").hide(),
            $("#review_" + e + "_full").html("").append(n),
            $("#review_" + e + "_full").show(),
            $("#af-" + e).hide(),
            $("#au-" + e).show
            (),
            load_event_monitor($("#review_" + e + "_full"))
        }
        ),
        !1
    }
    )
}, Douban.init_folder = function (t)
{
    $(t).click(function ()
    {
        var e = $(t).attr("id").split("-")[1];
        $("#review_" + e + "_full").hide(),
        $("#review_" + e + "_short").show(),
        $(t).hide(),
        $("#af-" + e).show()
    }
    )
}, Douban.init_bevf = function (e)
{
    var n = $(e).attr("id").split("bevs-")[1],
    i = $(".voters_header", e);
    if (i.length)
    {
        i.hover(function ()
        {
            $(this).addClass("clickable_title")
        }, function ()
        {
            $(this).removeClass("clickable_title")
        }
        );
        var o = $("#vsl", e),
        a = $(".link", e),
        r = $("#more_voters", e),
        s = function (s)
        {
            var c = $(".mv", e);
            if (c.length)
            {
                var l = c.toggle().css("display");
                a.text("none" == l ? "??′?¤???¨è??è€…" : "é??è—?"),
                r.length && r.toggle().css("display")
            }
            else
            {
                t = $("<li>?-￡??¨è￡…è??...</li>"),
                o.length ? o.append(t) : (i.after(o = $('<ul id="vsl" class="user-list pl indent"></ul>')), o.append(t));
                var u = "/j/entry/" + n + "/voters?start=8";
                $.getJSON(u, function (e)
                {
                    t.css("display", "none"),
                    t.before($(e.html)),
                    r.length && r.css("display", "none")
                }
                ),
                $(".link", e).text("é??è—?")
            }
            return !1
        };
        i.click(s),
        a.click(s)
    }
}, Douban.init_guidelink = function (t)
{
    $(t).click(function ()
    {
        return window.open("/help/guide1", "", "width=640,height=400"),
        !1
    }
    )
}, Douban.init_closelink = function (t)
{
    $('<a href="#">?…3é—-</a>').appendTo($(t)).click(function ()
    {
        return window.close(),
        !1
    }
    )
}, Douban.init_confirm_link = function (t)
{
    if (/recc/.test(t.name))
    {
        var e = t.name.split("-"),
        n = $(t).attr("href").split("/"),
        i = ("http:" != n[0] ? n[2] : n[4], "/j/rec_comment");
        $(t).click(function ()
        {
            var n = confirm("??????è|??? é?¤?");
            return n && $.getJSON(i,
            {
                rid : e[1],
                del_comment : e[2]
            }, function ()
            {
                $(t).parent().parent().parent().remove()
            }
            ),
            !1
        }
        )
    }
    else if (/sayc/.test(t.name))
    {
        var e = t.name.split("-"),
        n = $(t).attr("href").split("/"),
        i = ("http:" != n[0] ? n[2] : n[4], "/j/saying_comment");
        $(t).click(function ()
        {
            var n = confirm("??????è|??? é?¤?");
            return n && $.getJSON(i,
            {
                sid : e[1],
                del_comment : e[2]
            }, function ()
            {
                $(t).parent().parent().parent().remove()
            }
            ),
            !1
        }
        )
    }
    else
    {
        var t = $(t);
        t.click(function ()
        {
            var e = t.attr("title") || t.text();
            return e = "!" == e.slice(0, 1) ? e.slice(1) : "??????è|?" + e + "?",
            co
            nfirm(e)
        }
        )
    }
};
var populate_tag_btns = function (t, e,
    n, i)
{
    if (n.length)
    {
        var o = $("<dl><dt>" + t + " < / dt > < / dl > "),
        a = $("<dd> < / dd > ");
        $.each(n, function (t, e)
        {
            var n = $('<span class="tagbtn"></span>').addClass(i[e.toLowerCase()] ? "rdact" : "gract").text(e);
            a.append(n).append(" &nbsp; ")
        }
        ),
        o.append(a),
        e.append(o)
    }
};
Douban.init_music_sync_form = function (t)
{
    var e = $("form.music - sns"),
    n = $("form.show_sync");
    if (e.length && n.length)
    {
        $("#overlay, #dialog").hide();
        var i = dui.Dialog(
            {
                title : "??????????-￥?????ˉè?3è±??“￡èˉ′????????‰?–1??‘???",
                url : "/settings/pop",
                autoupdate : !0,
                callback : function (t, e)
                {
                    $("a#btn-later", e.node).bind("click", function ()
                    {
                        return $("div.dui-dialog").remove(),
                        $("#overlay, #dialog").show(),
                        !1
                    }
                    ),
                    $("a#btn-never", e.node).bind("click", function (t)
                    {
                        return t.preventDefault(),
                        $.post_withck("/settings/never_pop_sync_settings", {}, function ()
                        {
                            $("div.dui-dialog").remove(),
                            $("#overlay, #dialog").show()
                        }
                        ),
                        !1
                    }
                    ),
                    $("a.dui-dialog-close", e.node).bind("click", function ()
                    {
                        return $("div.dui-dialog").remove(),
                        $("#overlay, #dialog").show(),
                        !1
                    }
                    )
                }
            }
            );
        i.open(),
        $("a#btn-auth").live("click", function ()
        {
            $.post_withck("/settings/pop_sync", {}, function (t)
            {
                var e = i.node;
                0 == e.find(".bd").find("#pop-sync").length && (e.find(".bd").append(t), i.update())
            }
            )
        }
        )
    }
}, Douban.init_interest_form = function (e)
{
    Douban.init_music_sync_form(e);
    var n = $(e),
    i = {},
    o = {},
    a = $(".share-label", e);
    if ($("body").data("shuo-conf", !0), $("body").data("sina-conf", !0), $("body").data("tencent-conf", !0), "true" !== n.data("bind"))
    {
        n.data("bind", "true");
        var r = function (t)
        {
            i[t] && (o[t] = !0, $.each(i[t], function (t, e)
                {
                    $(e).removeClass("gract").addClass("rdact")
                }
                ))
        },
        s = function (t)
        {
            i[t] && (delete o[t], $.each(i[t], function (t, e)
                {
                    $(e).removeClass("rdact").addClass("gract")
                }
                ))
        },
        c = function ()
        {
            var n = $.trim(e.tags.value.toLowerCase()).split(" "),
            i = {};
            $.each(n, function (t, e)
            {
                "" != e && (r(e), i[e] = !0)
            }
            );
            for (t in o)
                i[t] || s(t)
        },
        l = function ()
        {
            var t = $("#inp-private"),
            e = t.parents("form").find(".share-label");
            checked = t.attr("checked"),
            checked ? e.addClass("greyinput").find("input").each(function (t, e)
            {
                e.__checked = e.checked,
                e.d
                isabled = !0,
                e.checked = !1
            }
            ) : e.removeClass("greyinput").find("input").each(
                function (t, e)
            {
                "__checked" in e && (e.checked = e.__checked),
                e.disabled = !1
            }
            )
        },
        u = function (t)
        {
            var e = t.data.key,
            n = $("body").data(e);
            n = 1 != n,
            $("body").data(e, n)
        };
        c(),
        $(e).data("comment") ? e.comment.focus() : "U" == $("#foldcollect").val() && e.tags.focus(),
        $(e).submit(function ()
        {
            var t = $(this).attr("action").split("/")[3];
            return remote_submit_json(this, function (n)
            {
                var i = $("#dialog .shuo :input[type=checkbox]"),
                o = $("div#dialog form.movie-sns"),
                a = $("div#dialog form.book-sns");
                if (0 != n.r)
                    return $("#saving").remove(), $("#submits").show(), $("#error").html(Douban.errdetail[n.r]), void refine_dialog();
                if ($("#collect_form_" + t).html(""), i.length && i[0].checked)
                    return close_dialog(), void("undefined" != typeof DoubanShare && (DoubanShare.share(n), DoubanShare.onDialogClose(function ()
                            {
                                self.location.replace(self.location.href)
                            }
                            )));
                if (o.length && n.cid)
                {
                    close_dialog();
                    var r = n.cid,
                    s = n.pid,
                    c = dui.Dialog(
                        {
                            title : "?·2????-???o??3???",
                            url : "/j/coupon_info?coupon_id=" + r,
                            autoupdate : !0,
                            callback : function (t, e)
                            {
                                $("a#btn-giveup, a#btn-close", e.node).bind("click", function ()
                                {
                                    return $(e.node).remove(),
                                    self.location.replace(self.location.href),
                                    !1
                                }
                                ),
                                $("a#btn-accept", e.node).bind("click", function (t)
                                {
                                    return t.preventDefault(),
                                    $.post_withck("/ticket/coupon/get/" + s + "/accept?cid=" + r, {}, function ()
                                    {
                                        var t = $(e.node);
                                        t.find("h3").html("?? é￠???–?o?è???? ????? ???"),
                                        t.find(".coupon_tit").html("é￠???–???????????ˉ??￥??°??ˉ?”¨???????? ??? ( <a href='http://movie.douban.com/ticket/coupon/' target='_blank'>http://movie.douban.com/ticket/coupon/</a> ) ??￥???"),
                                        t.find(".coupon").css("visibility", "hidden"),
                                        t.find("#btns a").hide(),
                                        t.find("#btns #btn-close").show()
                                    }
                                    ),
                                    !1
                                }
                                )
                            }
                        }
                        );
                    c.open()
                }
                else if (a.length && n.book_pop_sync)
                {
                    close_dialog();
                    var l = dui.Dialog(
                        {
                            title : "??????????-￥?????ˉè?3è±??“￡èˉ′????????‰?–1??‘???",
                            url : "/settings/pop",
                            autoupdate : !0,
                            callback : function (t, e)
                            {
                                $("a#btn-later", e.node).bind("click", function ()
                                {
                                    return $("div.dui-dialog").remove(),
                                    self.location.replace(self.location.href),
                                    !1
                                }
                                ),
                                $("a#btn-never", e.node).bind("click", function (t)
                                {
                                    return t.preven
                                    tDefault(),
                                    $.post_withck("/settings/neve
                                                                                        r_pop_sync_settings", {}, function ()
                                    {
                                        $("div.dui - dialog").remove(),
                                        self.location.replace(self.location.href)
                                    }
                                    ),
                                    !1
                                }
                                ),
                                $("a.dui - dialog - close", e.node).bind("click", function ()
                                {
                                    return self.location.replace(self.location.href),
                                    !1
                                }
                                )
                            }
                        }
                        );
                    l.open()
                }
                $(e).data("reload") ? /subject\/\d+\/comments/.test(location.href) ? /music/.test(location.href) ? location.reload() : location.href = location.href.split(" ? sort")[0] + " ? sort = time" : /people\/[^\/]+\/(edittag|all|do|wish|collect)/.test(location.href) ? location.href = location.href : location.search ? location.href = location.href.split(" ? ")[0] : location.reload() : close_dialog()
            }, !1),
            $("#submits").hide().after('<div id="saving" class="m">?-￡??¨????-?...</div>'),
            refine_dialog(),
            !1
        }
        ),
        a && ($("#inp-private").click(l), $("input[name=share-shuo]").bind("click",
            {
                key : "shuo-conf"
            }, u), $("input[name=share-sina]").bind("click",
            {
                key : "sina-conf"
            }, u), $("input[name=share-tencent]").bind("click",
            {
                key : "tencent-conf"
            }, u)),
        $(e.cancel).click(function ()
        {
            var t = $(e).attr("action").split("/")[3];
            $("#collect_form_" + t).html("")
        }
        ),
        $(".tagbtn", e).each(function (t)
        {
            var e = $(this).text().toLowerCase();
            i[e] ? i[e].push(this) : i[e] = [this]
        }
        ).click(function ()
        {
            var t = $(this).text(),
            n = $.trim(e.tags.value).split(" "),
            i = !1,
            o = t.toLowerCase();
            n = $.grep(n, function (t, e)
                {
                    return t.toLowerCase() != o || (s(o), i = !0, !1)
                }
                ),
            i || (n.push(t), r(o));
            var a = n.join(" ");
            e.tags.value = a.length > 1 ? a + " " : a,
            e.tags.focus()
        }
        ),
        $(e.tags).keyup(c)
    }
}, Douban.init_tries_to_listen = function (t)
{
    var e = $(t).attr("name");
    $(t).click(function ()
    {
        var n = !document.all;
        if ("" != e)
            var i = e.split("-"), o = i[0], a = i[1];
        else
            var o = 384, a = 450;
        var r = (screen.width - o) / 2,
        s = n ? (screen.height - a) / 2 : 50;
        return window.open($(t).attr("href"), "", "width=" + o + ",height=" + a + ",top=" + s + ",left=" + r + ",scrollbars=0,resizable=0,status=1"),
        !1
    }
    )
}, Douban.init_discover = function (t)
{
    var e = $("#discover_text")[0];
    $(t).submit(function (t)
    {
        if (!e.value || e.value == e.title)
            return !1;
        var n = "";
        n = $(":radio:checked")[0].value,
        "event" == n ? $("#discover_s").attr("action", "/event/search") : "group" == n ? $("#
            discover_s").attr("action", "/group/search?q=" + $("#discover_tex
                                                                        t").value) : $("#discover_s").attr("action", "/subject_search")
    }
    ),
    $(t, ":radio").click(function ()
    {
        e.focus()
    }
    )
};
var friend_form_update = function (t, e)
{
    $("#divac").html(t),
    $("#submitac").submit(function ()
    {
        return this.action = "/j/people/" + e + "/friend",
        remote_submit_json(this, function (e)
        {
            $("#divac").parent().html(e.html),
            $("#tip_wait").yellow_fade(),
            load_event_monitor($(t))
        }
        ),
        !1
    }
    ),
    $("#cancelac").click(function ()
    {
        $("#divac").html("")
    }
    )
};
Douban.init_review_full = function (t)
{
    var e = $(t).attr("id").split("_"),
    n = e[1],
    i = e[2];
    $(".link", t).click(function ()
    {
        var e = "/j/review/" + n + "/" + i;
        return $.getJSON(e, function (e)
        {
            $(t).html(e.html),
            load_event_monitor($(t))
        }
        ),
        !1
    }
    )
}, Douban.init_show_signup_table = function (t)
{
    $(t).click(function ()
    {
        return event_id = window.location.href.split("/")[4],
        pop_win.load("/j/event/" + event_id + "/signup")
    }
    )
};
var set_cookie = function (t, e, n, i)
{
    var o = new Date;
    o.setTime(o.getTime() + 24 * (e || 30) * 60 * 60 * 1e3);
    var a = "; expires=" + o.toGMTString();
    for (var r in t)
        document.cookie = r + "=" + t[r] + a + "; domain=" + (n || "douban.com") + "; path=" + (i || "/")
};
Douban.init_hideme = function (t)
{
    $(t).click(function ()
    {
        $(this).parent().parent().parent().hide()
    }
    )
}, Douban.init_more = function (t)
{
    $(t).click(function ()
    {
        lastObj = $(this).prev().find("input"),
        ids = /(.*_)(\d+)$/.exec(lastObj.attr("id")),
        id = ids[1] + (parseInt(ids[2]) + 1),
        a = lastObj.clone(),
        a.attr("value", ""),
        $(this).before("<br/>").before(a),
        a.attr("id", id).attr("name", id).wrap("<span></span>")
    }
    )
}, Douban.init_more2 = function (t)
{
    $(t).click(function ()
    {
        lastObj = $(this).prev().find("input"),
        ids = /(.*_)(\d+)_(\d+)$/.exec(lastObj.attr("id")),
        last_id = parseInt(ids[3]),
        nid = last_id + 1,
        id = ids[1] + parseInt(ids[2]) + "_" + nid,
        a = lastObj.clone(),
        a.attr("value", ""),
        $(this).before('<br/><span class="pl idx">' + (nid + 1) + "</span>").before(a),
        a.attr("id", id).attr("name", id).removeClass("m").wrap("<span></span>"),
        init_keyup(),
        list_data[id] = "?— "
    }
    )
}, Douban.init_search_text = function (t)
{
    t.value && t.value != t.title || ($(t).addClass("greyinput"), t.value = t.title),
    $(t).focus(function ()
    {
        $(t).remov
        eClass("greyinput"),
        t.value == t.title && (t.value = "")
    }
    ),
    $(t).blur(function ()
    {
        t.value || ($(t).addClass("greyinput"), t.value = t.title)
    }
    )
}, Douban.init_checkreg = function (t)
{
    $(t).find(".butt").click(function ()
    {
        var e = !0;
        return $(t).find("input").each(function ()
        {
            "submit" != this.type && "button" != this.type && ("" == this.value ? ($(this).next().css("display", "inline"), e = !1) : $(this).next().css("display", "none"))
        }
        ),
        e
    }
    )
}, Douban.init_click_tip = function (t)
{
    var e = $(t).parent().find(".blocktip");
    $(t).click(function ()
    {
        e.show().blur_hide(),
        m = e.width() + e.pos().x - $.viewport_size()[0] > 0 ? -e.width() : 0,
        e.css("margin - left", m)
    }
    ),
    $(".hideme", e).click(function ()
    {
        e.hide()
    }
    )
}, Douban.init_submit_link = function (t)
{
    $(t).click(function ()
    {
        $(t).parent().submit()
    }
    )
};
var nowmenu = null, hidemenu = function (t)
{
    t.find(".down").css("display", "inline"),
    t.find(".up").hide(),
    t.next().hide(),
    nowmenu = null,
    $("body").unbind("mousedown")
}, openmenu = function (t)
{
    null != nowmenu && hidemenu(nowmenu),
    t.find(".up").css("display", "inline"),
    t.find(".down").hide(),
    t.next().show(),
    nowmenu = t,
    $("body").mousedown(function ()
    {
        "on" != t.parent().attr("rel") && hidemenu(t)
    }
    )
};
$(function ()
{
    $("a", "#dsearch").each(function ()
    {
        $(this).click(function ()
        {
            return !clean_tip() || (urls = $(this).attr("href").split("?cat="), $("#ssform").attr("action", urls[0]), void 0 != urls[1] && $('<input type="hidden" name="cat" value="' + urls[1] + '" />').appendTo($("#ssform")), $("#ssform").submit(), !1)
        }
        )
    }
    ),
    $(".arrow").click(function ()
    {
        $(this).find(".up").is(":hidden") ? openmenu($(this)) : hidemenu($(this)),
        this.blur()
    }
    ),
    $(".arrow").parent().hover(function ()
    {
        $(this).attr("rel", "on")
    }, function ()
    {
        $(this).attr("rel", "off")
    }
    ),
    $.suggest && $("#page_focus").suggest("/j/subject_suggest",
    {
        onSelect : function ()
        {
            $(this).parents("form").append('<span><input name="add" value="1" type="hidden"/></span>').submit()
        }
    }
    ),
    $(":submit").each(function ()
    {
        "?? ??????" == $(this).val() && $(this).click(function ()
        {
            var t = this;
            setTimeout(function ()
            {
                t.disabled = 1
            }, 0)
        }
        )
    }
    ),
    $.browser.msie && "6.0" == $.browser.version && $("form.miniform > :submit").hover(function ()
    {
        $(this).addCla
        ss("hover")
    }, function ()
    {
        $(this).removeClass("hover")
    }
    )
}
), this.show
_dialog = function (t, e)
{
    $("#dialog").length || ($("body").prepend('<div id="overlay"></div><div id="dialog" style="width:' + (e || 550) + 'px;"></div>'), null != t ? $("#dialog").html(t) : $("#dialog").html("<div class='loadpop'>?-￡??¨è???…￥???èˉ·?¨??€?...</div>"), set_overlay())
}, this.set_overlay = function ()
{
    var t = $("#dialog"),
    e = t[0].offsetHeight + ($.browser.msie ? -2 : 16),
    n = t[0].offsetWidth + 16;
    $("#overlay").css(
    {
        height : e,
        width : n,
        marginLeft :  - (n / 2) + "px",
        marginTop :  - (e / 2) + "px",
        top : "50%",
        left : "50%"
    }
    ),
    t.css(
    {
        left : "50%",
        top : "50%",
        marginTop :  - (t.outerHeight() / 2) + "px",
        marginLeft :  - (t.outerWidth() / 2) + "px"
    }
    )
}, this.close_dialog = function ()
{
    return $("#overlay").unbind("click"),
    $("#dialog,#overlay,.bgi").remove(),
    "undefined" == typeof document.body.style.maxHeight && ($("body", "html").css(
        {
            height : "auto",
            width : "auto"
        }
        ), $("html").css("overflow", "")),
    document.onkeydown = "",
    !1
}, function ()
{
    "localStorage" in window || (window.localStorage = function ()
    {
        var t = document;
        if (!t.documentElement.addBehavior)
            throw "don't support localstorage or userdata.";
        var e = "_localstorage_ie",
        n = t.createElement("input");
        n.type = "hidden";
        var i = function (i)
        {
            return function ()
            {
                t.body.appendChild(n),
                n.addBehavior("#default#userData");
                var o = new Date;
                o.setDate(o.getDate() + 365),
                n.expires = o.toUTCString(),
                n.load(e);
                var a = i.apply(n, arguments);
                return t.body.removeChild(n),
                a
            }
        };
        return
        {
            getItem : i(function (t)
            {
                return this.getAttribute(t)
            }
            ),
            setItem : i(function (t, n)
            {
                this.setAttribute(t, n),
                this.save(e)
            }
            ),
            removeItem : i(function (t)
            {
                this.removeAttribute(t),
                this.save(e)
            }
            ),
            clear : i(function ()
            {
                for (var t, n = this.XMLDocument.documentElement.attributes, i = 0; t = n[i]; i++)
                    this.removeAttribute(t.name);
                this.save(e)
            }
            )
        }
    }
        ())
}
(), $(window).one("load", function ()
{
    var t = localStorage.getItem("report");
    if (t)
    {
        t = t.split("_moreurl_separator_");
        var e = function (n)
        {
            return "" == n ? void e(t.shift()) : void $.get("undefined" == typeof _MOREURL_REQ ? "/stat.html?" + n : _MOREURL_REQ + "?" + n, function ()
            {
                return t.length ? (e(t.shift()), void localStorage.setItem("report", t.join("_moreurl_separator_"))) : void localStorage.removeItem("report")
            }
            )
        };
        e(t.shift())
    }
}
), window.moreu
rl = _moreurl, $(document).click(function (t)
{
    var e = t.target,
    n = $(e).data("moreurl-dict");
    n && _moreurl(e, n)
}
);
var refine_dialog = function ()
{
    if ($("#dialog").length)
    {
        var t = (navigator.userAgent.toLowerCase(), .5 * ($.viewport_size()[1] - $("#dialog")[0].offsetHeight) + 140);
        $("#dialog,#overlay").css("top", t),
        set_overlay()
    }
};
Douban.init_show_full = function (t)
{
    $(t).click(function ()
    {
        $(t).parents(".short").hide(),
        $(t).parents(".short").next().show()
    }
    )
}, Douban.init_show_full2 = function (t)
{
    $(t).click(function ()
    {
        $(t).parents(".short").hide(),
        $(t).parents(".short").next().show(),
        $(t).parents(".reading-note").nextAll(".col-rec-con").show(),
        $(t).parents(".reading-note").next().children(".no-comments").show()
    }
    )
}, Douban.init_show_short = function (t)
{
    $(t).click(function ()
    {
        $(t).parents(".all").hide(),
        $(t).parents(".all").prev().show()
    }
    )
}, Douban.init_show_short2 = function (t)
{
    $(t).click(function ()
    {
        $(t).parents(".all").hide(),
        $(t).parents(".all").prev().show(),
        $(t).parents(".reading-note").nextAll(".col-rec-con").hide(),
        $(t).parents(".reading-note").next().children(".no-comments").hide()
    }
    )
}, Douban.init_show_more = function (t)
{
    $(t).click(function ()
    {
        $(t).parent().prevAll(".more").show(),
        $(t).parent().remove()
    }
    )
}, Douban.init_collect_btn = function (t)
{
    $(t).click(function (t)
    {
        if (t.preventDefault(), $("#hiddendialog").length)
            return show_dialog($("#hiddendialog").html()), void load_event_monitor($("#dialog"));
        show_dialog(null);
        var e = $(this).attr("name").split("-"),
        n = e[0],
        i = e[1],
        o = e[2],
        a = e[3],
        r = "/j/subject/" + i + "/interest?" + (o ? "interest=" + o : "") + (a ? "&rating=" + a : "") + ("cbtn" == n ? "&cmt=1" : "");
        return $.getJSON(r, function (t)
        {
            if ($("#dialog").length)
            {
                var e = $("<div></div>");
                e.get(0).innerHTML = t.html;
                var i = t.tags,
                o = i.join(" ");
                $("input[name=tags]", e).val(o.length > 1 ? o + " " : o);
                var a = {};
                $.each(i, function (t, e)
                {
                    a[e.toLowerCase()] = !0
                }
                ),
                populate_tag_btns("??‘???? ??-?:", $("#mytags", e), t.my_tags, a),
                populate_tag_btns("????”¨? ??-?:", $("#populartags", e), t.popular_tags, a),
                "pbtn" != n && "cbtn" != n || $("form", e).data("reload", 1),
                $("#dialog").html(e),
                $("#showtags").click(function ()
                {
                    $("#advtags").
                    is(":hidden") ? ($(this).html("???èμ· a–2"), $("#advtags").show(), $("#foldcollect").val("U")) : ($(this).html($(this).attr("rel")), $("#advtags").hide(), $("#foldcollect").val("F")),
                    $(this).blur(),
                    refine_dialog()
                }
                );
                var r = $("input[name=interest]", e),
                s = $(".rate_stars"),
                c = function ()
                {
                    r[0].checked ? s.hide() : s.show(),
                    refine_dialog()
                };
                if (r.click(c), c(), $("#left_n").length)
                {
                    var l = $("#left_n").text();
                    llen = l.match(/\d+/i) == l ? l : 350,
                    $("#comment").display_limit(llen, $("#left_n"))
                }
                if ("cbtn" == n)
                {
                    var u = $("h2", "#dialog");
                    u.text(u.text().replace("????”1", "?????-èˉ?")),
                    $("form", "#dialog").data("comment", 1)
                }
                load_event_monitor(e),
                $.fn.movieDisplayLimit = function (t, e, n)
                {
                    function i(t, e, n)
                    {
                        e.text(n - Math.ceil(t.val().replace(/[^\x00-\xff]/g, "**").length / 2))
                    }
                    function o(e)
                    {
                        var n = e.val().match(/[^\x00-\xff]/gi),
                        i = n ? n.length : 0,
                        o = e.val().length - i;
                        t.attr("maxlength", 350 + Math.ceil(o / 2))
                    }
                    i(t, e, n),
                    $(this).keyup(function ()
                    {
                        return i($(this), e, n),
                        o($(this)),
                        !1
                    }
                    )
                },
                $("div#dialog form.movie-sns").length && $("textarea#comment").unbind().movieDisplayLimit($("textarea#comment"), $("span#left_n"), 350)
            }
        }
        ),
        !1
    }
    )
}, Douban.init_nine_collect_btn = function (t)
{
    $(t).click(function ()
    {
        var t = $(this).attr("name").split("-"),
        e = t[0],
        n = t[1],
        i = t[2],
        o = "/j/subject/" + n + "/interest";
        return $.getJSON(o, i &&
        {
            interest : i
        }, function (t)
        {
            var i = $("<div></div>").html(t.html),
            o = t.tags,
            a = o.join(" ");
            $("input[name=tags]", i).val(a.length > 1 ? a + " " : a);
            var r = {};
            $.each(o, function (t, e)
            {
                r[e.toLowerCase()] = !0
            }
            ),
            populate_tag_btns("??‘???? ??-?(??1????·??? ):", $("#mytags", i), t.my_tags, r),
            populate_tag_btns("è±??“￡????‘?????”¨???? ??-?(??1????·??? ):", $("#populartags", i), t.popular_tags, r),
            "pbtn" == e && $("form", i).data("reload", 1),
            $("#collect_form_" + n).html("").append('<p class = "ul"> < / p > ').append(i),
            load_event_monitor($("#collect_form_" + n))
        }
        ),
        !1
    }
    )
}, Douban.init_rec_btn = function (t)
{
    var e = $(t).attr("name").split("-"),
    n = "/j/recommend",
    i = "rdialog-" + e[1] + "-" + e[2],
    o = function ()
    {
        var o = "I" == e[1] && void 0 == e[2] ? $("input", $(t).parent())[0].value : e[2],
        a = void 0 == e[3] ? "" : e[3],
        r = fu
            nction(e)
        {
            if ("I" == e)
            {
                var n = $(".text", "#dialog");
                n.lengt
                h && (n[0].value.length ? n[1].focus() : n[0].focus())
            }
            else
                $("#dialog").find(":submit").focus();
            $(t).hasClass("novote") && $("form", "#dialog").append(' < input name = "novote" value = "1" type = "hidden" / > ')
        };
        return $("#" + i).length ? (show_dialog($("#" + i).html()), load_event_monitor("#dialog"), r(e[1])) : $.getJSON(n,
        {
            type : e[1],
            uid : o,
            rec : a
        }, function (t)
        {
            if (show_dialog(t.html), "I" != e[1])
            {
                var n = $('<div id = "' + i + '"> < / div > ');
                n.html(t.html).appendTo("body").hide()
            }
            load_event_monitor("#dialog"),
            r(e[1])
        }
        ),
        !1
    };
    $(t).click(o),
    "I" == e[1] && $(t).parent().parent().submit(o)
}, Douban.init_rec_form = function (t)
{
    var e = $(t);
    e.submit(function (e)
    {
        return $(":submit,:input", this).attr("disabled", !0),
        $("#ban_word").remove(),
        remote_submit_json(this, function (e)
        {
            return trace(e),
            e.ban ? ($(":submit,:input", t).removeAttr("disabled"), void $(".recsubmit").before('<div class = "attn" style = "text-align:center" id = "ban_word" >? ? ?? ?? ? ¨è ?? ?? - ?? ‰è￠ ?? | ?? -￠ ?? ?? ? … ?? 1 < / div > ')) : ($("#dialog").html('<div class = "loadpop m" >? ? ¨è ?? ? ·2 ?? ?? o¤ < / div > '), set_overlay(), $("#rec_url_text").attr("value", "http://"), void setTimeout(function ()
                {
                    $("#dialog, #overlay").fadeOut(close_dialog),
                    "I" == $("input[name=type]", t).val() && document.location.reload()
                }, 400))
        }
        ),
        !1
    }
    ),
    e.find(".reccomment label").click(function (t)
    {
        $(this).next().focus()
    }
    ),
    e.find(".reccomment .text").focus(function (t)
    {
        $(this).prev().hide()
    }
    ).blur(function (t)
    {
        var e = $(this);
        "" === $.trim(e.val()) && $(this).prev().show()
    }
    ),
    e.set_len_limit(140)
}, Douban.init_saying_reply = function (t)
{
    var e = t.name.split("-"),
    n = "/j/saying_comment";
    t.rev || $(t).attr("rev", "unfold"),
    $(t).click(function ()
    {
        return "unfold" != t.rev ? ($(t).parent().parent().next().remove(), $(t).html($(t).attr("rev")), t.rev = "unfold") : "polling" != t.rel && (t.rel = "polling", $.getJSON(n,
            {
                sid : e[2],
                type : e[3],
                n : e[4],
                ni : e[5]
            }, function (e)
            {
                $('<div class = "recreplylst"> < / div > ').insertAfter($(t).parent().parent()).html(e.html),
                load_event_monitor($(t).parent().parent().next()),
                $(t).attr
                ("rev", $(t).html()).text("é??è—?????o”"),
                t.rel = "";
            }
            )),
        !1
    }
    )
}, Douban.init_rec_reply = function (t)
{
    var e = t.name.split("-"),
    n = "/j/rec_comment";
    t.rev || $(t).attr("rev", "unfold"),
    $(t).click(function ()
    {
        return "unfold" != t.rev ? ($(t).parent().parent().next().remove(), $(t).html($(t).attr("rev")), t.rev = "unfold") : "polling" != t.rel && (t.rel = "polling", $.getJSON(n,
            {
                rid : e[2],
                type : e[3],
                n : e[4],
                ni : e[5]
            }, function (e)
            {
                $('<div class = "recreplylst"> < / div > ').insertAfter($(t).parent().parent()).html(e.html),
                load_event_monitor($(t).parent().parent().next()),
                $(t).attr("rev", $(t).html()).text("é??è—?????o”"),
                t.rel = ""
            }
            )),
        !1
    }
    )
}, Douban.init_reply_form = function (t)
{
    $(t).attr("action", $(t).attr("rev"));
    var e = $(t).attr("name");
    $(t).submit(function ()
    {
        return remote_submit_json(this, function (n)
        {
            var i = $(t).parent();
            if ($(i).html(n.html), load_event_monitor(i), "n" == e)
                var o = $('<span><a href = "javascript:void(0)" >? · ?? ? ?? ?? o” < / a > < / span > ');
            else
                var o = $('<span style = "margin-left:53px"><a href = "javascript:void(0)" >? · ?? ? ?? ?? o” < / a > < / span > ');
            $("form", i).hide().after(o),
            o.click(function ()
            {
                $(this).prev().show(),
                $(this).remove()
            }
            )
        }
        ),
        $(":submit", t).attr("disabled", 1),
        !1
    }
    ),
    $(t).set_len_limit(140)
}, Douban.init_video_comment = function (t)
{
    $(t).submit(function ()
    {
        return remote_submit_json(this, function (e)
        {
            var n = $("#comments");
            $(n).html(e.html),
            load_event_monitor(n),
            $(":submit", t).removeAttr("disabled"),
            $("textarea", t).removeAttr("disabled").val("")
        }, !0, "/j/video/add_comment"),
        !1
    }
    )
}, Douban.init_video_del_comment = function (t)
{
    var e = $(t).attr("name").split("-");
    $(t).click(function ()
    {
        var n = t.title;
        return 1 == confirm("??????è|?" + n + "?") && $.postJSON_withck("/j/video/del_comment",
        {
            comment_id : e[1],
            video_id : e[2]
        }, function (t)
        {
            var n = $("#c-" + e[1]);
            $(n).html("")
        }
        ),
        !1
    }
    )
}, Douban.init_noti_form = function (t)
{
    $(":submit", t).click(function ()
    {
        $(this).addClass("selected")
    }
    ),
    $(t).attr("action", "/j/request/"),
    $(t).submit(function ()
    {
        return t.confirm.disabled = !0,
        t.ignore.disabled = !0,
        remote_submit_json(this, function (e)
        {
            $(t).parent().html(e.html)
        }
        ),
        !1
    }
    )
}, Doub
an.init_editable = function (t)
{
    var e = $("#display", t),
    n = $("form", t)[0],
    i = $("a", "#edi"),
    o = function (t)
    {
        if (vo
            id 0 != t)
        {
            var o = $("<div>").text(t)[0].innerText.replace(/\n/g, "<br>");
            e.html(o),
            "" == e.text() ? i.text("??1????·??? ???è?°").addClass("sign-text") : i.text("????”1").removeClass("sign-text")
        }
        e.show(),
        $(n).hide(),
        $("#edi").show()
    };
    o(e.html().replace(/<br>/g, "\n")),
    n.name && $(n).set_len_limit(n.name),
    $(n).submit(function ()
    {
        return remote_submit_json(n, function (t)
        {
            o(t.desc)
        }
        ),
        $("textarea", n)[0].value = "?-￡??¨????-?...",
        !1
    }
    ),
    $(".cancel", n).click(function ()
    {
        o()
    }
    ),
    $("#edi", t).click(function ()
    {
        $("#display, #edi").hide(),
        $("input,textarea", n).removeAttr("disabled");
        var i = $("<div>").html(e.html().replace(/<br>/g, "\n")).text();
        return $("textarea", t)[0].value = i,
        $(n).show(),
        $("textarea", t).focus(),
        !1
    }
    )
}, Douban.init_show_video = function (t)
{
    $(t).css("position", "relative").attr("target", ""),
    $(".vthumbwrap", t).append('<div class = "video_overlay"> < / div > ');
    var e = $("img", t).attr("name");
    $(t).click(function (n)
    {
        n.preventDefault();
        var i = $('<a href = "#" >? ?? è ?? < / a > ');
        i.click(function (e)
        {
            e.preventDefault(),
            $(t).show(),
            $(this).prev().remove(),
            $(this).remove()
        }
        ),
        $(t).after(i).after("<em>" + e + "</em>"),
        $(t).hide()
    }
    )
}, Douban.init_morerec = function (t)
{
    $(t).click(function ()
    {
        var e = $(t).parent().next();
        e.is(":hidden") ? e.show() : e.next().show(),
        $(t).remove()
    }
    )
}, Douban.init_search_result = function (t)
{
    $("#sinput").suggest("/j/subject_suggest",
    {
        resultsClass : "rc_results",
        onSelect : function ()
        {
            $(t).parent().submit()
        }
    }
    ),
    $(t).parent().submit(function ()
    {
        var t = $("#sinput")[0];
        return t && t.value != t.title
    }
    ),
    Douban.init_search_text(t)
}, Douban.init_prompt_link = function (t)
{
    $(t).click(function ()
    {
        var e = prompt(t.title || "èˉ·è?“?…￥");
        return e && (location.href = t.href + (t.href.indexOf("?") == -1 ? "?" : "&") + t.name + "=" + encodeURIComponent(e)),
        !1
    }
    )
}, Douban.init_discard_notify = function (o)
{
    $(o).click(function ()
    {
        var url = "/j/notification/discard",
        n_id = o.name;
        return $.post_withck(url,
        {
            id : n_id
        }, function (ret)
        {
            var r = eval("(" + ret + ")");
            "Y" === r.r && $("#reply_notify_" + n_id).remove()
        }
        ),
        !1
    }
    )
}, $.viewport_size = function ()
{
    va
    r t = [0, 0];
    return t = "undefined" != typeof window.innerWidth ? [window.innerWidth, window.innerHe
            ight] : "undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientWidth && 0 != document.documentElement.clientWidth ? [document.documentElement.clientWidth, document.documentElement.clientHeight] : [document.body.clientWidth, document.body.clientHeight]
}, $.ajax_withck = function (t)
{
    return "POST" == t.type && (t.data = $.extend(t.data || {},
            {
                ck : get_cookie("ck")
            }
            )),
    $.ajax(t)
}, $.postJSON_withck = function (t, e, n)
{
    $.post_withck(t, e, n, "json")
}, $.post_withck = function (t, e, n, i, o)
{
    return $.isFunction(e) && (i = n, n = e, e = {}

    ),
    $.ajax(
    {
        type : "POST",
        traditional : "undefined" == typeof o || o,
        url : t,
        data : $.extend(e,
        {
            ck : get_cookie("ck")
        }
        ),
        success : n,
        dataType : i || "text"
    }
    )
}, function ()
{
    var t = {};
    $.tmpl = function (e, n)
    {
        var i = t[e] = t[e] || new Function("obj", "var p=[];with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%})/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/{%=(.+?)%}/g, "', $1, '").split("{%").join("'); ").split("
                                                            %
                            }").join("p.push('") + "');
                }
                return p.join(''); ");
        return i(n)
    }
}
(), String.prototype.escapeHTML = function ()
{
    return this.replace(/&/g, "
        &amp; ").replace(/>/g, "
        &gt; ").replace(/</g, "
        &lt; ").replace(/'/g, "
        &#39;").replace(/"/g, "&quot;")
}, jQuery.fn.extend(
{
    pos : function ()
    {
        var t = this[0];
        if (t.offsetParent)
        {
            for (var e = 0, n = 0; t.offsetParent; t = t.offsetParent)
                e += t.offsetLeft, n += t.offsetTop;
            return
            {
                x : e,
                y : n
            }
        }
        return
        {
            x : t.x,
            y : t.y
        }
    },
    chop : function (t, e)
    {
        for (var n = [], i = [], o = 0, a = this.length; o < a; o++)
            !e != !t(this[o], o) ? n.push(this[o]) : i.push(this[o]);
        return [n, i]
    },
    sum : function (t, e)
    {
        for (var n = this.length, i = zero = e ? "" : 0; n; )
            i += this[--n][t] + (n && e || zero);
        return i
    },
    set_len_limit : function (t)
    {
        var e = this.find(":submit:first"),
        n = e.attr("value"),
        i = function ()
        {
            this.value && this.value.length > t ? e.attr("disabled", 1).attr("value", "?-—??°???è??è?…è??" + t + "?-—") : e.removeAttr("disabled").attr("value", n)
        };
        $("textarea", this).focus(i).blur(i).keydown(i).keyup(i)
    },
    display_limit : function (t, e)
    {
        var n,
        i = this,
        o = function (o)
        {
            var a = i.val();
            a != n && (a.length >= t && i.val(a.substring(0, t)), e.text(t - i.val().length), n = i.val())
        };
        this.keyup(o),
        o()
    },
    set_caret : function ()
    {
        if ($.br
            owser.msie)
        {
            var t = function ()
            {
                this.p = document.selection.createRange().duplicate()
            };
            this.click(t).select(t).keyup(t)
        }
    },
    insert_caret :
    function (t)
    {
        var e = this[0];
        if (document.all && e.createTextRange && e.p)
        {
            var n = e.p;
            n.text = "" == n.text.charAt(n.text.length - 1) ? t + "" : t
        }
        else if (e.setSelectionRange)
        {
            var i = e.selectionStart,
            o = e.selectionEnd,
            a = e.value.substring(0, i),
            r = e.value.substring(o);
            e.value = a + t + r,
            e.focus();
            var s = t.length;
            e.setSelectionRange(i + s, i + s),
            e.blur()
        }
        else
            e.value += t
    },
    get_sel :
    function ()
    {
        var t = this[0];
        return document.all && t.createTextRange && t.p ? t.p.text : t.setSelectionRange ? t.value.substring(t.selectionStart, t.selectionEnd) : ""
    },
    blur_hide :
    function ()
    {
        var t = this,
        e = function ()
        {
            return !1
        };
        return t.mousedown(e),
        $(document.body).mousedown(function ()
        {
            t.hide().unbind("mousedown", e),
            $(document.body).unbind("mousedown", arguments.callee)
        }
        ),
        this
    },
    yellow_fade :
    function ()
    {
        function t()
        {
            i.css(
            {
                backgroundColor : "rgb(100%,100%," + e + "%)"
            }
            ),
            e += n,
            n += .5,
            e <= 100 ? setTimeout(t, 35) : i.css(
            {
                backgroundColor : ""
            }
            )
        }
        var e = 0,
        n = 1,
        i = this;
        return t(),
        this
    },
    hover_fold :
    function (t)
    {
        var e =
        {
            folder : [1, 3],
            unfolder : [0, 2]
        },
        n = function (t, e)
        {
            return function ()
            {
                $("img", t).attr("src", "/pics/arrow1_" + e + ".png")
            }
        };
        return this.hover(n(this, e[t][0]), n(this, e[t][1]))
    },
    multiselect :
    function (t)
    {
        var e = function ()
        {
            return !0
        },
        n = t.onselect || e,
        i = t.onremove || e,
        o = t.onchange || e,
        a = t.selclass || "sel",
        r = t.values || [];
        return this.click(function ()
        {
            var t = / id(\d *) /.exec(this.className)[1],
            e = $.inArray(t, r);
            if (e != -1)
            {
                if (!i(this))
                    return;
                r.splice(e, 1),
                $(this).removeClass(a)
            }
            else
            {
                if (!n(this))
                    return;
                r.push(t),
                $(this).addClass(a)
            }
            return o(r),
            !1
        }
        )
    },
    initDataInput :
    function ()
    {
        var t = $(this);
        t.val() && t.val() !=  = t.attr("title") || (t.addClass("color-lightgray"), t.val(t.attr("title"))),
        t.focus(function ()
        {
            t.removeClass("color-lightgray"),
            t.val() ==  = t.attr("title") && t.val("")
        }
        ).blur(function ()
        {
            t.val() || (t.addClass("color-lightgray"), t.val(t.attr("title")))
        }
        )
    },
    setItemList :
    function (t)
    {
        var e = {},
        n = "",
        i = '<img class="gray-loader" src="/pics/spinner.gif" />',
        o = "/pics/spinner.gif",
        a = ".input-create",
        r =
        {
            keyup :
            function (i)
            {
                var o = i.target.
                    value.replace(/ /g, "");
                13 ==  = i.keyCode && t.create.callback(e, n, o, t.limit)
            }
        },
        s = document.body,
        c = new Image,
        l =
        {
            create :
            {
                title : "?–°??????",
                tips : "?????o?–°??????"
            }
        },
        t = $.extend(l, t),
        u = '<span class="create-new">' + t.create.title + "</span>",
        d = '<input class="input-create" type="text" value="" title="' + t.create.tips + '" maxlength="' + t.create.maxLen + '" />';
        c.src = o,
        $(this).click(function (i)
        {
            i.stopPropagation(),
            e = this,
            sglist.hide(),
            n = $.isFunction(t.target) ? t.target(e) : t.target,
            sgarrow.removeClass(CSS_ARROW_SELECT),
            $(e).addClass(CSS_ARROW_SELECT),
            $(CSS_SET_GROUP_LIST, this).show(),
            $(a).focus(),
            $.browser.msie && "8.0" !=  = $.browser.version && (sgarrow.css("z-index", ""), $(this).css("z-index", 10))
        }
        ),
        $(CSS_SET_GROUP_LIST).delegate("li:not('.last')", "click", function (e)
        {
            e.preventDefault();
            var o = e.target,
            a = this,
            r = "checkbox" ==  = o.type,
            s = $(this).children("input"),
            c = $(this).children("input").val(),
            l = r && s.attr("checked") || !r && !s.attr("checked") ? "addtotag" : "removefromtag";
            $(CSS_LOADER, this).length || s.hide().after(i),
            t.callback(a, l, r, n, c)
        }
        ),
        $(s).click(function (n)
        {
            $(CSS_SET_GROUP_LIST, this).hide(),
            $(e).removeClass(CSS_ARROW_SELECT),
            newGroupNum && newGroupNum < t.limit && $(a).replaceWith(u)
        }
        ),
        $(CSS_SET_GROUP_LIST).delegate(".create-new", "click", function ()
        {
            $(this).replaceWith(d),
            $(a).focus()
        }
        ),
        $(CSS_SET_GROUP_LIST).delegate(a, "keyup", function (t)
        {
            $.isFunction(r[t.type]) && r[t.type].call(this, t)
        }
        )
    }
}
);
var check_form = function (t)
{
    var e = !0;
    return $(":input", t).each(function ()
    {
        / notnull /.test(this.className) && "" == this.value || / most /.test(this.className) && this.value && this.value.length >  / most( \ d * ) / .exec(this.className)[1] ? ($(this).next().show(), e = !1) : / attn /.test($(this).next().attr("className")) && $(this).next().hide()
    }
    ),
    e
}, paras = function (t)
{
    var e = {};
    if (t.indexOf("?") == -1)
        return  {};
    for (var n = t.split("?")[1].split("&"), i = 0; i < n.length; i++)
        if (n[i].indexOf("=") != -1)
        {
            var o = n[i].split("=");
            e[o[0] + ""] = o[1] + ""
        }
    return e
};
tip_win.hide = function (t)
{
    $(t).parents(".blocktip").hide()
}, pop_win.fit = function ()
{
    if (window.__pop_win)
    {
        var t = __pop_win.body,
        e = t.offsetHeight + 16,
        n = t.offsetWidth + 16;
        __p
        op_win.body_j.css(
        {
            marginTop :  - (t.offsetHeight / 2)
        }
        ),
        __pop_win.bg_j.css(
        {
            height : e + "px",
            width : n + "px",
            left : "50%",
            top : "50%",
            marginTop :  - (e / 2) + "px",
            marginLeft :  - (n / 2) + "px",
            zIndex : 8888
        }
        ).show()
    }
}, pop_win.close = function ()
{
    $(__pop_win.bg).remove(),
    $(__pop_win.body).remove(),
    window.__pop_win = null
}, pop_win.load = function (t, e)
{
    return pop_win('<div style="padding:20px 60px;">?? è????-, èˉ·?¨??-‰...</div>'),
    $.ajax(
    {
        url : t,
        success : pop_win,
        cache : e || !1,
        dataType : "html"
    }
    ),
    !1
}, __load_bk = $.fn.load, $.fn.load_withck = function (t, e, n)
{
    return $.isFunction(e) && (n = e, e = {}

    ),
    __load_bk.call(this, t, $.extend(e,
        {
            ck : get_cookie("ck")
        }
        ), n)
}, Douban.init_song_interest = function (t)
{
    var e = $(t),
    n = e.attr("data-song-id") || e.attr("id").split("-")[1],
    i = "n",
    o = "y";
    e.click(function ()
    {
        var t = "/j/song/" + n + "/interest",
        a = e.hasClass("interest");
        return $.post_withck(t,
        {
            action : a ? i : o
        }, function (t)
        {
            e.toggleClass("interest"),
            a ? e.children().attr(
            {
                src : "/pics/gray-heart.gif",
                title : "??‘?–???￠",
                alt : "??‘?–???￠"
            }
            ) : e.children().attr(
            {
                src : "/pics/red-heart.gif",
                title : "??–???'??‘?–???￠'",
                alt : "??–???'??‘?–???￠'"
            }
            )
        }
        ),
        !1
    }
    )
}, Douban.init_vote_comment = function (t)
{
    if ("movie.douban.com" ==  = window.location.hostname || / ^movie\..*\.douban\.com /.test(window.location.hostname))
    {
        var e = $(t).prev().prev(),
        n = $(t).prev().val();
        $(t).click(function ()
        {
            $.postJSON_withck("/j/comment/vote",
            {
                id : n
            }, function (t)
            {
                t.count ? e.text(t.count) : alert("è???????-èˉ??? ?·2??????è???￥¨?o?")
            }
            )
        }
        )
    }
}, Douban.init_rev_text = function (t)
{
    if ("movie.douban.com" ==  = window.location.hostname || / ^movie\..*\.douban\.com /.test(window.location.hostname))
    {
        var e = $(t).parents("form"),
        n = $("input[name=rev_submit]");
        n.click(function ()
        {
            if ($(t).val().length < 50)
            {
                var n = / subject\ /( \ d * ) / .exec(location.href)[1];
                return $.getJSON("/j/comment/check",
                {
                    sid : n
                }, function (t)
                {
                    t.has ? confirm("?°‘?o?50?-—???èˉ?è?o?°?è￠?è?a??¨è????o??€??-èˉ?è?o?€??1??????￠?1??‰???‘è?¨?????€??-èˉ?è?o??…??1?€???ˉ??|??§??-???") && e.submit() : e.submit()
                }
                ),
                !1
            }
            return !0
        }
        )
    }
}, Douban.init_popup = function (t)
{
    $(t).click(function ()
    {
        var e = / (\d + )x(\d + )$ /.exec(t.className);
        return window.open(t.href, "popup", "heig
                                       ht=" + e[2] + ",width=" + e[1] + ",toolbar=no,menubar=no,scrollbars=no,location=no,status=no") || (location.href = t.href),
        !1
    }
    )
}, Douban.init_show_request_join_form = function (t)
{
    $(t).click(function ()
    {
        return group_id = $(t).data("group_id"),
        pop_win.load("/j/group/" + group_id + "/request_join_form")
    }
    )
}, Douban.init_show_comment_form = function (t)
{
    $(t).click(function ()
    {
        $(t).hide(),
        $("#comment_form").show()
    }
    )
}, Douban.init_add2cart = function (t)
{
    $(t).click(function ()
    {
        $.post_withck("/cart",
        {
            add : t.name
        }, function ()
        {
            $(t).next(".pl").hide(),
            $(t).hide().nextAll(".hidden").show().yellow_fade()
        }
        )
    }
    )
}, Douban.init_switch_tab = function (t)
{
    $(t).click(function ()
    {
        return $(".a_switch_tab").removeClass("current"),
        $(t).addClass("current"),
        $("#tag-loader").attr("class", "loading").text(""),
        $.getJSON("/j/recommended/switch",
        {
            tag : t.name
        }, function (t)
        {
            $(".tag-fav-cloud").replaceWith(t.tags),
            load_event_monitor(".tag-fav-cloud"),
            $(".rec-list").replaceWith(t.subjects),
            load_event_monitor(".rec-list")
        }
        ),
        !1
    }
    )
}, Douban.init_switch_tab_movie = function (t)
{
    $(t).click(function ()
    {
        return $(".a_switch_tab").removeClass("current"),
        url = $("#hide_full_path").attr("name") + "/switch",
        $("#tag_all").removeClass("current"),
        $(".tag-fav-cloud a").removeClass("current"),
        $(t).addClass("current"),
        $("#tag-loader").attr("class", "loading").text(""),
        $.getJSON(url,
        {
            tag : t.name
        }, function (t)
        {
            $(".rec-list").replaceWith(t.subjects),
            load_event_monitor(".rec-list"),
            $("#tag-loader").attr("class", "not-loading")
        }
        ),
        !1
    }
    )
}, Douban.init_get_more = function (t)
{
    $(t).click(function ()
    {
        return page = parseInt($(t).attr("attr")) + 10,
        url = $("#hide_full_path").attr("name") + "/switch",
        start = parseInt($(t).attr("start")) + 10,
        $(".a_switch_tab").removeClass("current"),
        $(t).addClass("current"),
        tag = t.name.replace("[", "", "g").replace("]", "", "g").replace("'", "", "g"),
        $("#tag-loader").attr("class", "loading").text(""),
        $.getJSON(url,
        {
            tag : tag,
            perpage : page,
            start : start
        }, function (e)
        {
            $(t).attr("attr", page),
            $(".rec-list").replaceWith(e.subjects),
            load_event_monitor(".rec-list"),
            $("#tag-loader").attr("class", "not-loading")
        }
        ),
        !1
    }
    )
}, Douban.init_nointeres
t_subject = function (t)
{
    $(t).click(function ()
    {
        return tag = $(".tag-fav-cloud > .current").attr("name"),
        $.post_withck("/j/recommended/nointerest_subject",
        {
            sid : t.name
        }, function (t)
        {
            "Y" == t && ($("#tag-loader").attr("class", "loading").text(), $.getJSON("/j/recommended/switch",
                {
                    tag : tag
                }, function (t)
                {
                    $(".tag-fav-cloud").replaceWith(t.tags),
                    load_event_monitor(".tag-fav-cloud"),
                    $(".rec-list").replaceWith(t.subjects),
                    load_event_monitor(".rec-list")
                }
                ))
        }
        ),
        !1
    }
    )
}, Douban.init_nointerest_entry = function (t)
{
    $(t).click(function ()
    {
        var e = t.href.match(/ nointerest = (\d + ) /)[1];
        return $.post_withck("/j/recommended/nointerest_subject",
        {
            sid : e
        }, function (t)
        {
            "Y" == t && window.location.reload()
        }
        ),
        !1
    }
    )
}, Douban.init_nointerest_subject_tab = function (t)
{
    $(t).click(function ()
    {
        return tag = $(".tag-fav-cloud > .current").attr("name"),
        $.post_withck("/j/recommended/nointerest_subject",
        {
            sid : t.name,
            tag : $(t).attr("tag")
        }, function (e)
        {
            "Y" == e && ($("#tag-loader").attr("class", "loading").text(), $.getJSON("/j/recommended/switch",
                {
                    tag : $(t).attr("tag")
                }, function (t)
                {
                    $(".tag-fav-cloud").replaceWith(t.tags),
                    load_event_monitor(".tag-fav-cloud"),
                    $(".rec-list").replaceWith(t.subjects),
                    load_event_monitor(".rec-list")
                }
                ))
        }
        ),
        !1
    }
    )
}, Douban.init_nointerest_subject_movie = function (t)
{
    $(t).click(function ()
    {
        url = $("#hide_full_path").attr("name") + "/nointerest_subject",
        self_item = $(this).parents(".item");
        var e = !0;
        return _self = this,
        e && (tag = $(".tag-fav-cloud > .current").attr("name"), total = $(".a_get_more").attr("attr"), $.post_withck(url,
            {
                sid : t.name
            }, function (t)
            {
                "Y" == t && self_item.fadeOut(function ()
                {
                    $.getJSON($("#hide_full_path").attr("name") + "/switch",
                    {
                        tag : tag,
                        perpage : total
                    }, function (t)
                    {
                        $(".rec-list").replaceWith(t.subjects),
                        load_event_monitor(".rec-list"),
                        $("#tag-loader").attr("class", "not-loading")
                    }
                    )
                }
                )
            }
            )),
        !1
    }
    )
}, Douban.init_nointerest_subject_top = function (t)
{
    $(t).click(function ()
    {
        url = $("#hide_full_path").attr("name") + "/nointerest_subject_top";
        var e = !0;
        return _self = this,
        e && ($(_self).parents("li").fadeOut("slow", function ()
            {
                $(this).remove()
            }
            ), last_num -= 1, cover_num -= 1, 0 ==  = cover_num && $("#movie-rec").remov
                e(), 5 ==  = last_num && $(".btn-next > a").addClass("dis"), $(".detail-tip").remove(), $.post_withck(url,
            {
                sid : t.name
            }, function (t)  {}

            )),
        !1
    }
    )
}, Douban.init_nointerest_doulist = function (t)
{
    $(t).click(function ()
    {
        return $("#doulist-loader").attr("class", "loading"),
        $.post_withck("/j/recommended/nointerest_doulist",
        {
            dl_del : t.name
        }, function (t)
        {
            $(".simple-dashed-list").replaceWith(t),
            load_event_monitor(".simple-dashed-list"),
            $("#doulist-loader").attr("class", "not-loading")
        }
        ),
        !1
    }
    )
}, Douban.init_nointerest_doulist_movie = function (t)
{
    $(t).click(function ()
    {
        return url = $("#hide_full_path").attr("name") + "/nointerest_doulist",
        $("#doulist-loader").attr("class", "loading"),
        $.post_withck(url,
        {
            dl_del : t.name
        }, function (t)
        {
            $(".simple-dashed-list").replaceWith(t),
            load_event_monitor(".simple-dashed-list"),
            $("#doulist-loader").attr("class", "not-loading")
        }
        ),
        !1
    }
    )
}, Douban.init_post_link = function (t)
{
    $(t).click(function (t)
    {
        var e = $(this),
        n = e.attr("href"),
        o = e.attr("title") || e.text() + "?",
        a = e.attr("rel"),
        r = "confirm_direct" == a || "" == a,
        s = "direct" == a || "confirm_direct" == a,
        c = e.attr("target"),
        l = n.split("?")[0],
        u = {},
        d = n.split("?")[1] || [];
        if ("string" == typeof d && (d = d.split("&")), t.preventDefault(), !e.hasClass("processing") && (!r || confirm(o)))
            if (s)
            {
                var f = [];
                for (d.push("ck=" + get_cookie("ck")), i = 0, p; i < d.length; i++)
                    p = d[i].split("="), f.push('<input type="hidden" name="' + p[0] + '" value="' + unescape(p[1]).escapeHTML() + '">');
                $('<form action="' + l + '" method="POST" target="' + (c || "_self") + '" sytle="display:none">' + f.join("") + "</form>").appendTo("body").submit()
            }
            else
            {
                for (i = 0; i < d.length; i++)
                {
                    var p = d[i].split("=");
                    u[p[0]] = p[1]
                }
                e.addClass("processing"),
                $.post_withck(l, u, function (t)
                {
                    e.removeClass("processing"),
                    location.reload(!0)
                }
                )
            }
    }
    )
};
try
{
    document.execCommand("BackgroundImageCache", !1, !0)
}
catch (t)
{}

Douban.init_donate = function ()
{
    var t = '<div class="blocktip dou-tip">{BODY}</div>',
    e = '<form action="" method="post"><div class="frm-item">?? ?°???‘???è€…èμ é€?<b>1</b>é￠—?°?è±?</div><div class="frm-item"><label for="dou-inp-msg">é?o??|?????aèˉ?...</label><input id="dou-inp-msg" type="text" name="n
            ote"></div><div class="frm-submit"><span class="bn-flat"><input type="submit" value="é€???o"></span><a href="#" class="tip-bn-cancel">??–???</a></div></form>',
    n = '<p>a€????è°￠a€??°???‘???è€…èμ é€?<b>1</b>é￠—?°?è±?????? è???2???‰?°?è±??€?<br><a href="http://www.douban.com/help/account#t4-q1">?€?? ·è?·??–?°?è±??</a></p><span class="bn-flat"><input type="button" class="tip-bn-cancel"  value="??￥é?“?o?"></span>',
    i = '<span class="donated-fail">{MSG}</span>',
    o = '<span class="donated-success">{MSG}</span>',
    a = "<p>?¤??????-???èˉ·?¨??€?...</p>",
    r = ".tip-bn-cancel",
    s = "processing",
    c = function (t, e)
    {
        t.replaceWith(i.replace("{MSG}", e)),
        u()
    },
    l = function (e, n)
    {
        u();
        var i = $(t.replace("{BODY}", e)).appendTo("body"),
        o = n.offset(),
        a = [],
        r = $(window),
        s = r.scrollTop() + r.height();
        return a = s - o.top < i.height() + 20 ? [o.left, o.top - i.height() - n.height()] : [o.left, o.top + n.height()],
        i.css(
        {
            position : "absolute",
            left : a[0] + "px",
            top : a[1] + "px"
        }
        ),
        i.show()
    },
    u = function ()
    {
        $(".dou-tip").remove()
    },
    d = function (t, e)
    {
        var n = e.offset(),
        i = [],
        o = $(window),
        a = o.scrollTop() + o.height();
        i = a - n.top < t.height() + 20 ? [n.left, n.top - t.height() - e.height()] : [n.left, n.top + e.height()],
        t.css(
        {
            left : i[0] + "px",
            top : i[1] + "px"
        }
        )
    },
    f = function (t)
    {
        var e = function (t)
        {
            t.error ? this.elm.replaceWith(i.replace("{MSG}", t.error)) : this.elm.replaceWith(o.replace("{MSG}", t.msg)),
            u()
        };
        t.preventDefault(),
        this.args.is_first = 0,
        this.args.note = $.trim(t.target.elements.note.value),
        this.relateTip.html(a),
        d(this.relateTip, this.elm),
        $.dataPoster(this.url, this.args, $.proxy(e, this), "post", "json")
    },
    p = function (t)
    {
        t.preventDefault(),
        u(),
        this.elm && this.elm.removeClass(s)
    },
    h = function (t)
    {
        var i,
        o = this.elm;
        return t.error ? void c(o, t.error) : (t.balance ? (i = l(e, o), this.relateTip = i, i.find("form").bind("submit", $.proxy(f, this)), i.find(r).bind("click", $.proxy(p, this)), i.find("input[type=text]").bind(
                {
                    focusin : function (t)
                    {
                        $(this).prev().hide()
                    },
                    focusout : function (t)
                    {
                        "" ==  = this.value && $(this).prev().show()
                    }
                }
                )) : (i = l(n, o), i.css("width", "260px"), this.relateTip = i, i.find(r).bind("click", $.proxy(p, this))), void $(window).bind("resize", function ()
            {
                d(i, o)
            }
            ))
    };
    $(
        "body").delegate(".btn-donate", "click", function (t)
    {
        var e,
        n,
        i,
        o,
        a = $(t.currentTarget),
        r = a.attr("href").split("?"),
        c =
        {
            elm : a
        },
        l =
        {
            is_first : 1
        };
        if (t.preventDefault(), !a.hasClass(s))
        {
            if (a.addClass(s), r[1])
                for (e = r[1].split("&"), i = 0, o = e.length; i < o; i++)
                    n = e[i].split("="), l[n[0]] = n[1] || "";
            c.args = l,
            c.url = r[0],
            $.dataPoster(r[0], l, $.proxy(h, c), "post", "json")
        }
    }
    )
}, $(function ()
{
    load_event_monitor(document)
}
), window.console && window.console.info("?–???￠???è±??“￡?????￡? ????è????ˉ??‘??°?o???€?1?bug???????|??’???‘?????€èμ·??oè±??“￡?·?? –?? ?“|??§???\nhttp://jobs.douban.com/#position-zsqd"), Douban.init_stars = function (t)
{
    var e,
    n = function ()
    {
        var t = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
        return window.devicePixelRatio > 1 || !(!window.matchMedia || !window.matchMedia(t).matches)
    },
    i =
    {
        1 : "????·?",
        2 : "è???·?",
        3 : "è??è??",
        4 : "??¨è??",
        5 : "???è??"
    },
    o = $("#n_rating", t),
    a = $("#stars img", t),
    r = $("#stars"),
    s = n() && r.data("hollow-2x") ? r.data("hollow-2x") : r.data("hollow"),
    c = n() && r.data("solid-2x") ? r.data("solid-2x") : r.data("solid"),
    l = function (e)
    {
        var n = o.val() || 0;
        e ? ($("#rateword", t).text(i[e]), a.each(function (t)
            {
                this.src = t < e ? c : s
            }
            )) : ($("#rateword", t).text(n ? i[n] : ""), a.each(function (t)
            {
                this.src = t < n ? c : s
            }
            ))
    };
    a.hover(function ()
    {
        l(this.id.charAt(4))
    }, function ()
    {
        l(e || 0)
    }
    ),
    o.attr("name") && a.click(function ()
    {
        e = this.id.charAt(4),
        o.val(e),
        l(e)
    }
    ),
    l()
}, $(function ()
{
    $("[name=my_followings]").bind("change", function ()
    {
        $(this).prop("checked") ? location.search = "?show_followings=on" : location.search = ""
    }
    )
}
), Douban.init_show_login = function (t)
{
    var e = function ()
    {
        var t = "",
        e = location.hostname.match(/ (.*)\.douban\.com /);
        e && (t = e[1]);
        for (var n = [
                {
                    name : "fm",
                    reg : / douban\.fm /
                },
                {
                    name : "sns",
                    reg : / www\.douban\.com /
                },
                {
                    name : "group",
                    reg : / douban\.com\ /group /
                }
            ], i = 0, o = n.length; i++; i < o)
        {
            var a = n[i];
            location.href.match(a.reg) && (t = a.name)
        }
        return t || "sns"
    },
    n = e(),
    i = "https://accounts.douban.com/popup/login?source=" + n,
    o = "https://s.doubanio.com/dae/cdnlib/libs/components/accounts/popup.min.css",
    a = "https://s.doubanio.com/dae
            /cdnlib/libs/jquery-overlay/overlay.min.js",
    r = location.protocol + "//" + location.hostname,
    s = '\n<iframe src="javascript:;" frameborder="0" scrolling="no" width="478" height="382" name="' + r + '">\n</iframe>',
    c = function ()
    {
        $.overlay.open(s, function ()
        {
            $.overlay.body.find("iframe").attr("src", i)
        }
        )
    },
    l = $(t);
    l.click(function (t)
    {
        t.preventDefault(),
        $.overlay ? c() : Douban.loader.batch([o, a]).done(c)
    }
    ),
    $(window).bind("message", function (t)
    {
        "https://accounts.douban.com" ==  = t.originalEvent.origin && $.overlay.body.find("iframe").css("height", t.originalEvent.data)
    }
    )
};
