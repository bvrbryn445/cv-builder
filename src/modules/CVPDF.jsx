import React, { forwardRef, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ReactToPrint from 'react-to-print';
import '../styles/cv-pdf.css';

import CVDesign1 from '../components/CVs/Design1';
import CVDesign2 from '../components/CVs/Design2';
import CVDesign3 from '../components/CVs/Design3';

const cvDesigns = [
	CVDesign1,
	CVDesign2,
	CVDesign3,
];

const RenderCVById = ({ userData, id }) => (
	cvDesigns.map((Component, index) => {
		if (index + 1 == id) {
			return (
				<Component
					key={index}
					userData={userData}
				/>
			)
		}
	})
)

const RenderPDFViewer = forwardRef((props, ref) => (
	<PDFViewer
		width={'595px'}
		height={'842px'}
		showToolbar={false}
		ref={ref}
	>
		<RenderCVById {...props} />
	</PDFViewer>
))

const RenderPDFDownloadLink = ({ userData, id }) => (
	<PDFDownloadLink
		document={<RenderCVById userData={userData} id={id} />}
		fileName={`yourCV_${id}.pdf`}>
		{
			({ loading }) => (loading
				? 'Loading document...'
				: 'Download')
		}
	</PDFDownloadLink >
)

const PDFViewerContainer = (props) => {
	const { userData, id } = props;
	const navigate = useNavigate();
	const PDFRef = useRef();
	console.log(PDFRef);
	return (
		<div className='pdf-viewer-container'>
			<span className='pdf-options'>
				<RenderPDFDownloadLink userData={userData} id={id} />
				<ReactToPrint
					trigger={() => <a>Print</a>}
					content={() => PDFRef.current}
				/>
				<a onClick={() => navigate('/')}>Edit CV Data</a>
			</span>
			<RenderPDFViewer {...props} ref={PDFRef} />
		</div>
	)
}

export default function CVPDF(props) {
	const { userData } = props;
	const { id } = useParams();
	return <PDFViewerContainer userData={userData} id={id} />
}