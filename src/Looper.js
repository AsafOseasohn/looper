import React from 'react'
import './App.css';
import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination();
const volume = new Tone.Volume(-12).toDestination();
const sampler = new Tone.Players({
    'Future_funk': 'samples/120_future_funk_beats_25.mp3',
    'Breakbeats': 'samples/120_stutter_breakbeats_16.mp3',
    'Bass_Warwick': 'samples/Bass Warwick heavy funk groove on E 120 BPM.mp3',
    'Electric_guitar': 'samples/electric guitar coutry slide 120bpm - B.mp3',
    'Stompy_Slosh': 'samples/FUD_120_StompySlosh.mp3',
    'Tanggu': 'samples/GrooveB_120bpm_Tanggu.mp3',
    'maze_politics': 'samples/MazePolitics_120_Perc.mp3',
    'Groove': 'samples/PAS3GROOVE1.03B.mp3',
    'Silent_star': 'samples/SilentStar_120_Em_OrganSynth.mp3',

})

// connecting the sampler to the machine's volume
sampler.connect(volume)

const pads = {
    'Future_funk': false, 'Breakbeats': false, 'Bass_Warwick': false,
    'Electric_guitar': false, 'Stompy_Slosh': false, 'Tanggu': false,
    'maze_politics': false, 'Groove': false, 'Silent_star': false
}
// creating the musical timing logic and synchronization
const sequence = new Tone.Sequence(function (time, idx) {
    Object.keys(pads).forEach(pad => {
        if (pads[pad] === false) {
            sampler.player(pad).stop()
            sampler.player(pad).stop()

        }
    })
    if (idx === 0) {
        Object.keys(pads).forEach(pad => {
            if (pads[pad] === true) {
                sampler.player(pad).start()
                sampler.player(pad).loop = true
            }
        })
    }

}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '8n');

function Looper() {

    // invoked by user's click on play, starts the musical time (transport on 120bpm)
    // and sequence
    function startLooper() {
        Tone.start()
        Tone.Transport.bpm.value = 120;
        Tone.Transport.start();
        sequence.start()
    }

    function togglePad(pad) {
        pads[pad] = !pads[pad]
    }

    // invoked by user's click on stop, resets the looper and transport
    function stopLooper() {

        Object.keys(pads).forEach(pad => {
            pads[pad] = false
            sampler.player(pad).stop()
            sampler.player(pad).stop()
            Tone.Transport.stop()
            sequence.stop()
        })
    }

    return (
        <div>
            <div className="pads">
                {Object.keys(pads).map(pad =><div className="pad" onClick={() =>
                    togglePad(pad)}>{pad.replace("_", " ")}</div>)}
            </div>
            <div className="buttons">
                <button className="play" onClick={startLooper}>Play</button>
                <button className="stop" onClick={stopLooper}>Stop</button>
            </div>
        </div>
    )
}

export default Looper
