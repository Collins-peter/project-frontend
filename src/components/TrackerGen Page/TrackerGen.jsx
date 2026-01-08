import "./TrackerGen.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { packageService } from "../../service/api.js";

function TrackerGen() {
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [description, setDescription] = useState("");
    const [trackingNumber, setTrackingNumber] = useState(null);
    const [alert, setAlert] = useState("");
    const [loading, setLoading] = useState(false);
    const [ copy, setCopy ] = useState(false);

    const trackingNumberRef = useRef();

    const createPackage = async (e) => {
        e.preventDefault();
        if (!sender || !receiver || !description) {
            setAlert("Please fill in all fields.");
            return;
        }
        setLoading(true);
        const packageInfo = { senderName: sender, receiverName: receiver, description };
        const result = await packageService.createPackage(packageInfo);
        setLoading(false);
        if (result.success) {
            setTrackingNumber(result.data.trackingNumber);
            setSender("");
            setReceiver("");
            setDescription("");
        } else {
            setAlert(result.error);
        }
    };

    const handleCopy = async() => {
        try {
            await navigator.clipboard.writeText(String(trackingNumberRef.current.innerText));
            setCopy(true);
        } catch (error) {
            console.error ("Failed to Copy: ", error);
        }
    }

    const doneBtn = async() => {
        setTrackingNumber(null);
    };

    useEffect(() => {      
        if (alert || copy) {
            const timer = setTimeout(() => {
                setAlert("");
                setCopy(false)
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alert, copy]);

    return (
        <div className="trackerView">
            <div className="trackerContainer">
                <h4>CREATE PACKAGE
                    <div>
                        <Link to="/trackpackage">Track Package</Link>
                        <Link to="/updatestatus">Update Status</Link>
                    </div>
                </h4>
                <form onSubmit={createPackage}>
                    <div>
                        <label htmlFor="senderName">Sender</label>
                        <input type="text" name="senderName" value={sender} onChange={e => setSender(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="receiverName">Receiver</label>
                        <input type="text" name="receiverName" value={receiver} onChange={e => setReceiver(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="description">Package Description</label>
                        <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} required />
                    </div>
                    {alert && (
                        <div className="message">
                            {alert}
                        </div>
                    )}
                    <button className="submitBtn" type="submit" disabled={loading}>
                        {loading ? "Generating..." : "Generate Tracking"}
                    </button>

                    {trackingNumber && (
                        <div className="alertMsg">
                            <p>Successfully Registered</p>
                            <h3>Tracking Number: <div ref={trackingNumberRef}>{trackingNumber}</div> <button onClick={handleCopy}>{copy? "Copied" : "Copy"}</button> </h3>
                            <button onClick={doneBtn}>Done</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default TrackerGen;
