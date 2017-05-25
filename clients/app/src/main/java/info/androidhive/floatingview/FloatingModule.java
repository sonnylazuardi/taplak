package info.androidhive.floatingview;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

public class FloatingModule extends ReactContextBaseJavaModule {


    public FloatingModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void show() {
        FloatingViewService.showBalloon();
    }

    @ReactMethod
    public void hide() {
        FloatingViewService.hideBalloon();
    }

    @Override
    public String getName() {
        return "FloatingAndroid";
    }
}