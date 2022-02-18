/*
    ISC License
    
    Copyright (c) 2022, aiden (aiden@cmp.bz)
    
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
function scdl() {
    if (typeof scdl.c == "undefined") {
        scdl.c = 0n;
    }
    let key = "scdl" + Math.floor(Math.random() * 0x100000000).toString(0x10).padStart(8, "0") + scdl.c++;
    let fuck = true;
    webpackJsonp.push([[], { [key]: function (_, __, r) {
        if (fuck) {
            fuck = false;
            return;
        }
        for (let idx = 0; typeof scdl.f == "undefined"; ++idx) {
            let obj = r(idx);
            if ("getCurrentSound" in obj) {
                scdl.f = obj;
            }
        }
        let player = scdl.f.getCurrentSound().player.player._player._controllerManager._cacheManager._players.find(e => e._playlistSegmentRetriever != null);
        if (!player) {
            return alert("Play a song.");
        }
        let segments = player._playlistSegmentRetriever._segments;
        if (player._playlist._data.segments.length != segments.length) {
            return alert("Song not fully downloaded yet.");
        }
        let u8_arrays = [];
        for (let idx = 0; idx < segments.length; ++idx) {
            u8_arrays.push(segments[idx].dataRetrieveJob._jobControl.progressUpdates.getProgressSoFar().data);
        }
        alert("issa " + player._transmuxerAndMimeType.mimeType);
        location = URL.createObjectURL(new Blob(u8_arrays, { type: "application/octet-stream" }));
    } }, [[key]]]);
}
