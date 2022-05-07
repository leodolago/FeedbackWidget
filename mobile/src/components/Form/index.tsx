import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

import * as FileSystem from 'expo-file-system';

import { FeedbackType } from '../../components/Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Buttom } from '../Buttom';
import { captureScreen } from 'react-native-view-shot';

import { styles } from './styles';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedBackSent: () => void;
}

export function Form({ feedbackType, onFeedBackSent, onFeedbackCanceled }: Props) {
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [ screenshot, setScreenshot ] = useState<string |null>(null);
    const [comment, setComment] = useState('');

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error));
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        if(isSendingFeedback) {
            return;
        }

        setIsSendingFeedback(true);

        const onSendAnotherFeedback = screenshot && FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});

        try {
            await api.post('feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${onSendAnotherFeedback}`,
                comment
            });

            onFeedBackSent();

        } catch(error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }



  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft 
                size={24}
                weight="bold"
                color={theme.colors.text_secondary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Image 
                source={feedbackTypeInfo.image}
                style={styles.image}
                />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>

        <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary} 
        autoCorrect={false}
        onChangeText={setComment}
        />

        <View style={styles.footer}>
            <ScreenshotButton
            onTakeShot={handleScreenshot}
            onRemoveShot={handleScreenshotRemove}
            screenshot={screenshot}

            />
            <Buttom 
            onPress={handleSendFeedback}
            isLoading={isSendingFeedback} />
        </View>
    </View>
  );
}