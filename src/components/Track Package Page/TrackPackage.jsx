import "./TrackPackage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { packageService } from "../../service/api";


function TrackPackage() {
    const [trackId, setTrackId] = useState("");
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const trackPackage = async(e) => {
        e.preventDefault();
        setError(""); // Clear previous error

        if (!trackId) {
            setError("Pls fill in the field");
            return;
        }  
        try {
            setLoading(true);
            const result = await packageService.trackPackage(trackId);
            if (result.success) {
                setPackageData(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    const doneBtn = () => {
        setPackageData(null);
        setTrackId("");
        setError("");
    }

    setTimeout(() => {
        setError("");
    }, 4000)

    return(
        <div className="trackPackageView">
            <div className="trackPackageContainer">
                <h4>Track Package
                    <div>
                        <Link to="/">Create Package</Link>
                        <Link to="/updatestatus">Update Status</Link>
                    </div>
                </h4>

                <form onSubmit={trackPackage}>
                    <div>
                        <label htmlFor="trackId">Enter TrackingID</label>
                        <input type="text" name="trackId" value={trackId}
                                onChange={e => setTrackId(e.target.value)} required/>
                    </div>
                    {error && (
                        <div className="errorMsg">{error}</div>
                    )}
                    <button type="submit">{loading? "Tracking..." : "Track Package"}</button>

                </form>

                {packageData && (
                    <div className="dataInfo">
                        <p><strong>Tracking Number:</strong> <h4>{packageData.tracking_number}</h4></p>
                        <p><strong>Sender:</strong> <h4>{packageData.sender_name}</h4></p>
                        <p><strong>Receiver:</strong> <h4>{packageData.receiver_name}</h4></p>
                        <p><strong>Description:</strong> <h4>{packageData.description}</h4></p>
                        <p><strong>Status:</strong> <h4>{packageData.status}</h4></p>
                        <button onClick={doneBtn}>Done</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrackPackage;