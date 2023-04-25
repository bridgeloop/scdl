/*
    ISC License
    
    Copyright (c) 2023, aiden (aiden@cmp.bz)
    
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
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