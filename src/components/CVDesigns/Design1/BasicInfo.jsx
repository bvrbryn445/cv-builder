import React from 'react';
import { View, Text } from '@react-pdf/renderer';

import { styles } from './styles';

export default function BasicInfo(props) {
	const {
		fullName,
		emailAddress,
		phoneNum,
		address,
		website
	} = props.userData;
	return (
		<View >
			<Text style={styles.fullName}>{fullName}</Text>
			<Text style={styles.basicInfo}>{emailAddress}</Text>
			<Text style={styles.basicInfo}>{phoneNum}</Text>
			<Text style={styles.basicInfo}>{address}</Text>
			<Text style={styles.basicInfo}>{website}</Text>
		</View>
	)
}