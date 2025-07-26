import React, { useEffect, useState } from 'react'
import '../../style/student.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Home = () => {
    const navigate=useNavigate();
    const [outpasses, setOutpasses] = useState([]);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/student/home', {
                    withCredentials: true // Important if cookies are involved
                });
                const data = response.data;
                console.log(data.message);
                setOutpasses(data.Outpasses);
                setIssues(data.Issues);
                setLoading(false);
            } catch (err) {
                console.log('error', err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const cancelOutpass = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/student/outpass/${id}`, {
                withCredentials: true,
            });
            setOutpasses(prev => prev.filter(outpass => outpass.id !== id));
            toast.success("Outpass cancelled successfully");
        } catch (err) {
            console.log('error at outpass deletion', err);
            toast.error("something went wrong");
        }
    }
    
    const cancelIssue = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/student/issue/${id}`, {
                withCredentials: true,
            });
            setIssues(prev => prev.filter(issue => issue.id!==id) );
            toast.success("Issue cancelled successfully");
        } catch (err) {
            console.log('error at deletion of Issue', err);
            toast.error("something went wrong");
        }
    }

    const feedbackOutpass=(id) => {
        navigate(`/student/feedback/outpass/${id}`);
    }
    const feedbackIssue=(id) =>{
        navigate(`/student/feedback/issue/${id}`);
    }
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return '#10B981'; // Green
            case 'pending': return '#F59E0B'; // Yellow
            case 'rejected': return '#EF4444'; // Red
            case 'cancelled': return '#6B7280'; // Gray
            default: return 'rgb(137, 24, 26)'; // Red accent
        }
    }

    const getStatusBg = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'rgba(16, 185, 129, 0.15)';
            case 'pending': return 'rgba(245, 158, 11, 0.15)';
            case 'rejected': return 'rgba(239, 68, 68, 0.15)';
            case 'cancelled': return 'rgba(107, 114, 128, 0.15)';
            default: return 'rgba(137, 24, 26, 0.15)';
        }
    }

    const styles = {
        container: {
            backgroundColor: '#000000',
            minHeight: '100vh',
            padding: '2rem 1rem',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)'
        },
        section: {
            backgroundColor: '#111111',
            borderRadius: '16px',
            padding: '2rem',
            margin: '2rem 0',
            boxShadow: '0 8px 32px rgba(137, 24, 26, 0.2)',
            border: '1px solid rgba(137, 24, 26, 0.2)',
            backdropFilter: 'blur(10px)'
        },
        sectionTitle: {
            color: '#FFFFFF',
            fontSize: '2rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #FFFFFF 0%, rgb(137, 24, 26) 50%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(137, 24, 26, 0.3)',
            position: 'relative'
        },
        titleUnderline: {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            backgroundColor: 'rgb(137, 24, 26)',
            borderRadius: '2px'
        },
        tableContainer: {
            backgroundColor: '#0a0a0a',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(137, 24, 26, 0.3)',
            overflowX: 'auto',
            boxShadow: '0 4px 20px rgba(137, 24, 26, 0.1)'
        },
        table: {
            width: '100%',
            minWidth: '600px'
        },
        tableHeader: {
            backgroundColor: '#1a1a1a',
            borderBottom: '2px solid rgba(137, 24, 26, 0.5)'
        },
        tableHeaderCell: {
            padding: '1.5rem 1rem',
            color: '#CCCCCC',
            fontSize: '0.875rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textAlign: 'center',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        },
        tableRow: {
            backgroundColor: '#0f0f0f',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        },
        tableCell: {
            padding: '1.25rem 1rem',
            color: '#FFFFFF',
            fontSize: '0.95rem',
            textAlign: 'center',
            borderRight: '1px solid rgba(255, 255, 255, 0.05)'
        },
        statusBadge: {
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            display: 'inline-block',
            minWidth: '90px',
            border: '1px solid currentColor'
        },
        cancelButton: {
            backgroundColor: 'rgb(137, 24, 26)',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(137, 24, 26, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        emptyState: {
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#CCCCCC'
        },
        emptyIcon: {
            fontSize: '4rem',
            color: 'rgb(137, 24, 26)',
            marginBottom: '1.5rem',
            opacity: 0.7
        },
        emptyText: {
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: '0.5rem'
        },
        emptySubtext: {
            color: '#999999',
            fontSize: '1rem'
        },
        loadingSpinner: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            flexDirection: 'column'
        },
        spinner: {
            width: '50px',
            height: '50px',
            border: '4px solid rgba(137, 24, 26, 0.2)',
            borderTop: '4px solid rgb(137, 24, 26)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
        },
        loadingText: {
            color: '#FFFFFF',
            fontSize: '1.1rem',
            fontWeight: '500'
        },
        statsCard: {
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '2rem',
            gap: '1rem'
        },
        statItem: {
            backgroundColor: '#1a1a1a',
            padding: '1rem',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid rgba(137, 24, 26, 0.2)',
            minWidth: '120px'
        },
        statNumber: {
            fontSize: '2rem',
            fontWeight: '700',
            color: 'rgb(137, 24, 26)',
            marginBottom: '0.5rem'
        },
        statLabel: {
            color: '#CCCCCC',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        }
    }

    const spinnerKeyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `

    if (loading) {
        return (
            <div style={styles.container}>
                <style>{spinnerKeyframes}</style>
                <div style={styles.loadingSpinner}>
                    <div style={styles.spinner}></div>
                    <p style={styles.loadingText}>Loading your data...</p>
                </div>
            </div>
        )
    }

    return (
        <div style={styles.container}>
            <style>
                {`
                    ${spinnerKeyframes}
                    .table-row:hover {
                        background-color: rgba(137, 24, 26, 0.1) !important;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 20px rgba(137, 24, 26, 0.3);
                        border-left: 3px solid rgb(137, 24, 26);
                    }
                    .cancel-button:hover {
                        background-color: #A01E1E !important;
                        transform: translateY(-2px);
                        box-shadow: 0 6px 25px rgba(137, 24, 26, 0.6) !important;
                    }
                    .cancel-button:active {
                        transform: translateY(0);
                    }
                    .section-title::after {
                        content: '';
                        position: absolute;
                        bottom: -10px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 80px;
                        height: 3px;
                        background: rgb(137, 24, 26);
                        border-radius: 2px;
                    }
                    .stat-item:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 6px 20px rgba(137, 24, 26, 0.3);
                        border-color: rgb(137, 24, 26);
                    }
                    @media (max-width: 768px) {
                        .section-title {
                            font-size: 1.5rem !important;
                        }
                        .section-padding {
                            padding: 1.5rem !important;
                        }
                        .container-padding {
                            padding: 1rem 0.5rem !important;
                        }
                        .stats-card {
                            flex-direction: column !important;
                        }
                    }
                `}
            </style>
            
            <div className='container-padding' style={styles.container}>
                {/* Overview Stats */}
                <div style={styles.statsCard} className='stats-card'>
                    <div style={styles.statItem} className='stat-item'>
                        <div style={styles.statNumber}>{outpasses.length}</div>
                        <div style={styles.statLabel}>Total Outpasses</div>
                    </div>
                    <div style={styles.statItem} className='stat-item'>
                        <div style={styles.statNumber}>{issues.length}</div>
                        <div style={styles.statLabel}>Total Issues</div>
                    </div>
                    <div style={styles.statItem} className='stat-item'>
                        <div style={styles.statNumber}>
                            {outpasses.filter(o => o.status?.toLowerCase() === 'pending').length}
                        </div>
                        <div style={styles.statLabel}>Pending Items</div>
                    </div>
                </div>

                {/* Outpasses Section */}
                <div className='section-padding' style={styles.section}>
                    <h1 className='section-title' style={styles.sectionTitle}>
                        📋 My Outpasses
                    </h1>
                    
                    <div style={styles.tableContainer}>
                        {outpasses.length === 0 ? (
                            <div style={styles.emptyState}>
                                <div style={styles.emptyIcon}>📝</div>
                                <p style={styles.emptyText}>No outpasses found</p>
                                <p style={styles.emptySubtext}>
                                    You haven't submitted any outpass requests yet.
                                </p>
                            </div>
                        ) : (
                            <table style={styles.table}>
                                <thead style={styles.tableHeader}>
                                    <tr>
                                        <th style={styles.tableHeaderCell}>S.No</th>
                                        <th style={styles.tableHeaderCell}>Type</th>
                                        <th style={styles.tableHeaderCell}>Status</th>
                                        <th style={styles.tableHeaderCell}>Date</th>
                                        <th style={styles.tableHeaderCell}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {outpasses.map((outpass, index) => (
                                        <tr 
                                            key={outpass.id || index}
                                            className='table-row'
                                            style={styles.tableRow}
                                        >
                                            <td style={styles.tableCell}>
                                                <strong>{index + 1}</strong>
                                            </td>
                                            <td style={styles.tableCell}>
                                                <span style={{ fontWeight: '600', color: '#FFFFFF' }}>
                                                    {outpass.type}
                                                </span>
                                            </td>
                                            <td style={styles.tableCell}>
                                                <span 
                                                    style={{
                                                        ...styles.statusBadge,
                                                        color: getStatusColor(outpass.status),
                                                        backgroundColor: getStatusBg(outpass.status)
                                                    }}
                                                >
                                                    {outpass.status}
                                                </span>
                                            </td>
                                            <td style={styles.tableCell}>
                                                <span style={{ fontWeight: '500' }}>
                                                    {new Date(outpass.date).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td style={styles.tableCell}>
                                                {outpass.status === "pending" ? (
                                                    <button
                                                        className="cancel-button"
                                                        style={styles.cancelButton}
                                                        onClick={() => cancelOutpass(outpass.id)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    ) : (
                                                    outpass.feedbackGiven === false && (
                                                        <button
                                                        className="cancel-button"
                                                        style={styles.cancelButton}
                                                        onClick={() => feedbackOutpass(outpass.id)}
                                                        >
                                                        Feedback
                                                        </button>
                                                    )
                                                )}  
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Issues Section */}
                <div className='section-padding' style={styles.section}>
                    <h1 className='section-title' style={styles.sectionTitle}>
                        🔧 My Issues
                    </h1>
                    
                    <div style={styles.tableContainer}>
                        {issues.length === 0 ? (
                            <div style={styles.emptyState}>
                                <div style={styles.emptyIcon}>✅</div>
                                <p style={styles.emptyText}>No issues reported</p>
                                <p style={styles.emptySubtext}>
                                    Great! You haven't reported any issues recently.
                                </p>
                            </div>
                        ) : (
                            <table style={styles.table}>
                                <thead style={styles.tableHeader}>
                                    <tr>
                                        <th style={styles.tableHeaderCell}>S.No</th>
                                        <th style={styles.tableHeaderCell}>Type</th>
                                        <th style={styles.tableHeaderCell}>Status</th>
                                        <th style={styles.tableHeaderCell}>Date</th>
                                        <th style={styles.tableHeaderCell}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {issues.map((issue, index) => (
                                        <tr 
                                            key={issue.id || index}
                                            className='table-row'
                                            style={styles.tableRow}
                                        >
                                            <td style={styles.tableCell}>
                                                <strong>{index + 1}</strong>
                                            </td>
                                            <td style={styles.tableCell}>
                                                <span style={{ fontWeight: '600', color: '#FFFFFF' }}>
                                                    {issue.type}
                                                </span>
                                            </td>
                                            <td style={styles.tableCell}>
                                                <span 
                                                    style={{
                                                        ...styles.statusBadge,
                                                        color: getStatusColor(issue.status),
                                                        backgroundColor: getStatusBg(issue.status)
                                                    }}
                                                >
                                                    {issue.status}
                                                </span>
                                            </td>
                                            <td style={styles.tableCell}>
                                                <span style={{ fontWeight: '500' }}>
                                                    {new Date(issue.date).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td style={styles.tableCell}>
                                                {issue.status === "pending" ? (
                                                    <button
                                                        className="cancel-button"
                                                        style={styles.cancelButton}
                                                        onClick={() => cancelIssue(issue.id)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    ) : (
                                                    issue.feedbackGiven === false && (
                                                        <button
                                                        className="cancel-button"
                                                        style={styles.cancelButton}
                                                        onClick={() => feedbackIssue(issue.id)}
                                                        >
                                                        Feedback
                                                        </button>
                                                    )
                                                )}
                                               
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;