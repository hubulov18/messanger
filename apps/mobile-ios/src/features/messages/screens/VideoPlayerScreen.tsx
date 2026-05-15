import { StyleSheet, View } from 'react-native';

import { VideoPlayerModal } from '@features/messages/components/VideoPlayerModal';

type VideoPlayerScreenProps = {
  navigation?: {
    goBack?: () => void;
  };
  route?: {
    params?: {
      videoUrl?: string;
      mimeType?: string;
      title?: string;
      caption?: string | null;
    };
  };
};

export function VideoPlayerScreen({ navigation, route }: VideoPlayerScreenProps) {
  const params = route?.params;

  return (
    <View style={styles.screen}>
      <VideoPlayerModal
        videoUrl={params?.videoUrl ?? ''}
        mimeType={params?.mimeType}
        title={params?.title}
        caption={params?.caption ?? null}
        onClose={() => navigation?.goBack?.()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#000',
    flex: 1,
  },
});
