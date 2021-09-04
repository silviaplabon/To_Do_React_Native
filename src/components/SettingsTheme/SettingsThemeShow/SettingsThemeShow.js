import React from 'react';
import { FlatList } from 'react-native';
import Subtitle from '../../../EmotionComponents/Subtitle';
import SettingsThemeDetails from '../SettingsThemeDetails/SettingsThemeDetails';

const SettingsThemeShow = (props) => {
	const{colors,state,type}=props;
	
	return (
		<>
		<Subtitle text={type} textColor="lavenderblush" />
		<FlatList
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				marginTop: 5,
				paddingBottom: 5,
			}}
			numColumns={10}
			keyExtractor={(item) => `${item.id}`}
			data={colors}
			renderItem={itemData =>
				<SettingsThemeDetails color={itemData.item.color} id={itemData.item.id}  state={state}></SettingsThemeDetails>
			}
		>
		</FlatList>
		</>
	);
};

export default SettingsThemeShow;