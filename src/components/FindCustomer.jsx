import React, { useEffect, useState } from "react";
import { auth, firestore, collection, getDocs, query, where, doc, updateDoc, deleteDoc } from "../../firebase";

const FindCustomer = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchRequests(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchRequests = async (uid) => {
    try {
      const requestsRef = collection(firestore, "requests");
      const q = query(requestsRef, where("cookId", "==", uid));
      const querySnapshot = await getDocs(q);

      const requestsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestsList);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      const requestRef = doc(firestore, "requests", requestId);
      await updateDoc(requestRef, { status });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      const requestRef = doc(firestore, "requests", requestId);
      await deleteDoc(requestRef);
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border spinner-border-lg text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="top"></div>
      <div className="container dashboard">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card mb-5 mt-5">
              <div className="card-header text-center">
                <h2>Cooks Dashboard</h2>
              </div>
              <div className="card-body">
                <p>
                  Welcome to the Cooks Dashboard! Here you can find all the
                  requests that customers made to book you.
                </p>
                {requests.length === 0 ? (
                  <p className="text-danger fw-bold">No booking requests found.</p>
                ) : (
                  <div>
                    {requests.map((request) => (
                      <div key={request.id} className="card mt-3 bg-light">
                        <div className="card-body">
                          <h5 className="card-title">Booking Request</h5>
                          <hr />
                          <p className="card-text">
                            <strong>Customer Name:</strong> {request.customerDetails.name}
                          </p>
                          <p className="card-text">
                            <strong>Customer Email:</strong> {request.customerDetails.email}
                          </p>
                          <p className="card-text">
                            <strong>Customer Address:</strong> {request.customerDetails.address}
                          </p>
                          <p className="card-text">
                            <strong>Customer Phone:</strong> {request.customerDetails.phone}
                          </p>
                          <p className="card-text">
                            <strong>Customer Pincode:</strong> {request.customerDetails.pincode}
                          </p>
                          <p className="card-text">
                            <strong>Status:</strong> {request.status}
                          </p>
                          <p className="card-text">
                            <strong>Timestamp:</strong> {new Date(request.timestamp.seconds * 1000).toLocaleString()}
                          </p>
                          <button
                            className="btn btn-success me-2"
                            onClick={() => handleStatusUpdate(request.id, "accepted")}
                            disabled={request.status === "accepted"}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger me-2"
                            onClick={() => handleStatusUpdate(request.id, "rejected")}
                            disabled={request.status === "rejected"}
                          >
                            Reject
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteRequest(request.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindCustomer;
