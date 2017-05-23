package info.androidhive.floatingview;

import android.os.IBinder;
import android.app.Service;
import android.content.Intent;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.util.Log;
/**
 * Created by Philip on 24/5/17.
 */

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
                    System.out.println(clip.getItemAt(0).getText());
                }
            };

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
