import "./UpdateStatus.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { packageService } from "../../service/api.js";
import { socket } from "../../service/socket.js";


function UpdateStatus() {
    const [trackingId, setTrackingId] = useState("");
    const [status, setStatus] = useState("In-Transit");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    //LISTEN FOR REAL-TIME UPDATES
    useEffect(() => {
        socket.on("statusUpdated", (data) => {
            if (data.trackingId === trackingId) {
                setSuccess(data.success);
            }
        });

        return () => socket.off("statusUpdated");
    }, [trackingId]);


    //HANDLE STATUS-UPDATE
    const updateBtn = async(e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const result = await packageService.updateStatus(trackingId, status);
            if (result.success) {
                setSuccess("Status Successfully Updated");
                setTrackingId("");
                setStatus("In-Transit");
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError("An unexpected error occurred.");
            console.error(error);
        }
    }

    //HANDLE TIMEOUT
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess("");
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);


    
    return(
        <div className="statusView">
            <div className="statusContainer">
                <h4>Update Status 
                    <div>
                        <Link to="/">Create Package</Link>
                        <Link to= "/trackpackage">Track Package</Link>
                    </div>
                </h4>
                <form onSubmit={updateBtn}>
                    <div>
                        <label htmlFor="trackingId">Enter Tracking ID</label>
                        <input type="text" name="trackingId" value={trackingId}
                                 onChange={e=>setTrackingId(e.target.value)} required/>
                    </div>
                    <div>
                        <label htmlFor="status">Select Status</label>
                        <select id="status" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="In-Transit">In-Transit</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                    {error && (
                        <div className="errorMsg">{error}</div>
                    )}
                    {success && (
                        <div className="successMsg">{success}</div>
                    )}
                    <button type="submit">Update Status</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateStatus;