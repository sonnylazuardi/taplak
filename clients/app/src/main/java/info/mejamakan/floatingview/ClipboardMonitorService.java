package info.mejamakan.floatingview;

import android.os.IBinder;
import android.app.Service;
import android.content.Intent;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.util.Log;
import android.webkit.URLUtil;

import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ClipboardMonitorService extends Service{
    private ClipboardManager mClipboardManager;
    private static final String TAG = "ClipboardManager";

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG,"I am here");
        mClipboardManager =
                (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
        mClipboardManager.addPrimaryClipChangedListener(
                mOnPrimaryClipChangedListener);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        if (mClipboardManager != null) {
            mClipboardManager.removePrimaryClipChangedListener(
                    mOnPrimaryClipChangedListener);
        }
    }

    private ClipboardManager.OnPrimaryClipChangedListener mOnPrimaryClipChangedListener =
            new ClipboardManager.OnPrimaryClipChangedListener() {
                @Override
                public void onPrimaryClipChanged() {
                    Log.d(TAG, "onPrimaryClipChanged");
                    ClipData clip = mClipboardManager.getPrimaryClip();
                    if (clip.getItemAt(0).getText() != null) {
                        String data = clip.getItemAt(0).getText().toString();

                        if (!URLUtil.isValidUrl(data)) {
                            Intent broadcastIntent = new Intent();
                            broadcastIntent.setAction("com.mejamakan.taplak.SHOW_BOX");
                            sendBroadcast(broadcastIntent);

                            FloatingModule.mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                    .emit("CLIPBOARD_COPY", data);
                        }
                    }
                }
            };

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
