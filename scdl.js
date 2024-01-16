/*
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
*/
if (!window.get_r) {
    window.get_r = function get_r() {
        if (get_r.cache) {
            return get_r.cache[1];
        }
        get_r.cache = [];
        webpackJsonp.push([[], {
            get_r(_, __, r) {
                get_r.cache.push(r);
            }
        }, [["get_r"]]]);
        return get_r.cache[1];
    }
}
function scdl() {
    function find(...functions) {
        functions = new Set(functions);
        let r = get_r();
        let v = {};
        let max = webpackJsonp.flat(Infinity).length;
        for (let idx = 0; idx < max; ++idx) {
            try {
                let obj = r(idx);
                for (let fn of functions) {
                    let p = fn(obj);
                    if (p) {
                        v = { ...v, ...p };
                        functions.delete(fn);
                        if (functions.size == 0) {
                            return v;
                        }
                    }
                }
            } catch {}
        }
        return null;
    }
    if (!scdl.cache) {
        scdl.cache = find(
            function (obj) {
                if (obj.getCurrentSound) {
                    return { getCurrentSound: obj.getCurrentSound };
                }
            }
        );
    }
    let curr = scdl.cache.getCurrentSound();
    let streamUrlRetriever = curr.player.player._player._controllerManager._streamUrlRetriever;
    streamUrlRetriever._retrieveStreamUrl(
        streamUrlRetriever._mediaPayload.transcodings.find(p =>
            p.format.protocol == "progressive"
        ).url
    ).onCompletion(async url => {
        let blobURL = URL.createObjectURL(new Blob(
            [await fetch(url).then(p => p.arrayBuffer())],
            { type: "application/octet-stream", }
        ));
        let anchor = document.createElement("a");
        anchor.download = curr.attributes.permalink + ".mp3";
        anchor.href = blobURL;
        anchor.click();
    });
}
