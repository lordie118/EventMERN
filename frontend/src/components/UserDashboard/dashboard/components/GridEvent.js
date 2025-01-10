import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { enrollEvent, fetchEvents, getUserEvents } from '../../../../redux/slices/eventSlice';
import toast, { Toaster } from 'react-hot-toast';
import { CCol, CContainer, CRow, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

export default function GridEvent() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const events = useSelector((state) => state.events.events || []);
  const userEvents = useSelector((state) => state.events.userEvents || []);
  console.log('les evenment ',userEvents);
  
  const loading = useSelector((state) => state.events.status === 'loading');
  const error = useSelector((state) => state.events.error);
  const Connecteduser = useSelector((state) => state.connected.connected);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (Connecteduser && Connecteduser._id) {
      dispatch(getUserEvents());
    }
  }, [dispatch, Connecteduser]);

  const handleEnroll = (eventId) => {
    if (Connecteduser && Connecteduser._id) {
      dispatch(enrollEvent({ eventId, userId: Connecteduser._id }))
        .then(() => {
          toast.success('Inscription réussie !');
          setVisible(false);
        })
        .catch((error) => {
          console.error('Erreur lors de l\'inscription :', error);
          alert('Erreur lors de l\'inscription.');
        });
    } else {
      alert('Utilisateur non connecté. Veuillez vous connecter.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Connecteduser) {
    return <div>Utilisateur non connecté. Veuillez vous connecter.</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Toaster />
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>LES EVENEMENTS DISPONIBLES</h1>
      <CContainer>
        <CRow xs={{ cols: 3 }}>
          {events.map((event, index) => (
            <CCol
              onClick={() => {
                if (event._id) {
                  setSelectedEventId(event._id); 
                  setVisible(true); 
                } else {
                  alert("Événement non valide");
                }
              }}
              className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              key={index}
            >
              <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{event.nom}</div>
                  <p className="text-gray-700 text-base">{event.description}</p>
                  <p className="text-gray-700 text-base">{event.date}</p>
                  <p className="text-gray-700 text-base">{event.mode}</p>
                </div>
              </div>
            </CCol>
          ))}
        </CRow>
      </CContainer>

      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>VOS ÉVÉNEMENTS</h1>
      <CContainer>
        <CRow xs={{ cols: 3 }}>
          {userEvents.map((event, index) => (
            <CCol key={index} className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
              <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{event.nom}</div>
                  <p className="text-gray-700 text-base">{event.description}</p>
                  <p className="text-gray-700 text-base">{event.date}</p>
                  <p className="text-gray-700 text-base">{event.mode}</p>
                </div>
              </div>
            </CCol>
          ))}
        </CRow>
      </CContainer>

      <CModal
        visible={visible}
        onClose={() => {
          setVisible(false);
		  setSelectedEventId(null);
		}}
		aria-labelledby="LiveDemoExampleLabel"
	  >
		<CModalHeader>
		  <CModalTitle id="LiveDemoExampleLabel">
			S'inscrire à un événement
		  </CModalTitle>
		</CModalHeader>

		<CModalBody>
		  {selectedEventId && (
			<div style={{ textAlign: 'center' }}>
			  {events
				.filter((event) => event._id === selectedEventId)
				.map((event) => (
				  <div key={event._id}>
					<h2 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{event.nom}</h2>
					<p style={{ margin: '10px 0' }}>{event.description}</p>
					<p style={{ margin: '10px 0' }}>Date: {event.date}</p>
					<p style={{ margin: '10px 0' }}>Mode: {event.mode}</p>
					<p style={{ margin: '10px 0' }}>Lien: {event.lien}</p>
					
				  </div>
				))}
			</div>
		  )}
		</CModalBody>
		
		<CModalFooter>
		  <CButton
			color="secondary"
			onClick={() => {
              setVisible(false);
              setSelectedEventId(null);
            }}
          >
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleEnroll(selectedEventId)}>
            S'inscrire
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="bg-violet-300
                        text-white py-10 px-5">
            <div className="container mx-auto
                            text-center">
                <h1 className="text-5xl 
                               font-bold mb-4">
                   Vos Events  
                </h1>
                <p className="text-xl mb-6">
                    Join us to explore
                    the amazing features
                    we offer!
                </p>
             
            </div>
        </div>
    </div>
  );
}

