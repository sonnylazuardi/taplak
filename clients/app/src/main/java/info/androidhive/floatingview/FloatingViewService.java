package info.androidhive.floatingview;

import android.app.Activity;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.PixelFormat;
import android.os.Bundle;
import android.os.IBinder;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.shell.MainReactPackage;

import java.util.ArrayList;

import static android.R.id.message;
import static android.R.id.toggle;
import static android.content.ContentValues.TAG;


public class FloatingViewService extends Service {

    private WindowManager mWindowManager;
    private View mFloatingView;

    RecyclerView myRecyclerView;

    private Intent intent;
    private RelativeLayout mCollapseView;
    private RelativeLayout mDragView;
    private ImageView mCloseView;
    public static Context context;
    private boolean shouldShowBox = false;

    public ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    private final BroadcastReceiver receiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (action.equals("com.mejamakan.taplak.SHOW_BOX")){
                showBox();
            }
        }
    };


    public FloatingViewService() {}

    @Override
    public int onStartCommand (Intent intent, int flags, int startId) {
        int result = super.onStartCommand(intent, flags, startId);
        if (intent != null) {
            String mode = intent.getExtras().getString("MODE");
            Log.d("FLOATING_VIEW_SERVICE", "Service created with mode: " + mode);
            if (mode == "BOX") {
                showBox();
            }
        }

        return result;
    }


    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    public static int getDPI(int size, DisplayMetrics metrics){
        return (size * metrics.densityDpi) / DisplayMetrics.DENSITY_DEFAULT;
    }

    public void showBox() {
        final DisplayMetrics metrics;
        metrics = new DisplayMetrics();
        mWindowManager.getDefaultDisplay().getMetrics(metrics);

        mCollapseView.setLayoutParams(new RelativeLayout.LayoutParams(getDPI(300, metrics),getDPI(300, metrics)));
        mDragView.setLayoutParams(new RelativeLayout.LayoutParams(getDPI(300, metrics),getDPI(50, metrics)));
        mDragView.setTag("box");
        mCloseView.setVisibility(View.VISIBLE);
        FloatingModule.mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("SHOW_BALLOON", false);
    }

    @Override
        public void onCreate() {
        super.onCreate();
        context = this.getApplicationContext();

        //Inflate the floating view layout we created
        mFloatingView = LayoutInflater.from(this).inflate(R.layout.layout_floating_widget, null);
//        mFloatingView = LayoutInflater.from(this).inflate((RelativeLayout)MyReactActivity.mReactRootView, null);

        //Add the view to the window.
        final WindowManager.LayoutParams params = new WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT);
        //Specify the view position
        params.gravity = Gravity.TOP | Gravity.LEFT;        //Initially view will be added to top-left corner
        params.x = 0;
        params.y = 100;

        mCollapseView = (RelativeLayout) mFloatingView.findViewById(R.id.collapse_view);
        mDragView = (RelativeLayout) mFloatingView.findViewById(R.id.expanded_container);
        mCloseView = (ImageView) mFloatingView.findViewById(R.id.close_btn);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new FloatingPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        mReactRootView.startReactApplication(mReactInstanceManager, "App", null);

        mCollapseView.addView(mReactRootView);

        //Add the view to the window
        mWindowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        mWindowManager.addView(mFloatingView, params);
//        mWindowManager.addView(MyReactActivity.mReactRootView, params);
//
//        this.hideBalloon();

        final DisplayMetrics metrics;
        metrics = new DisplayMetrics();
        mWindowManager.getDefaultDisplay().getMetrics(metrics);

        IntentFilter filter = new IntentFilter();
        filter.addAction("com.mejamakan.taplak.SHOW_BOX");
        registerReceiver(receiver, filter);

        ImageView closeButtonCollapsed = (ImageView) mFloatingView.findViewById(R.id.close_btn);
        closeButtonCollapsed.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //close the service and remove the from from the window
                if (mDragView.getTag().equals("balloon")) {
                    mCollapseView.setLayoutParams(new RelativeLayout.LayoutParams(getDPI(300, metrics),getDPI(300, metrics)));
                    mDragView.setLayoutParams(new RelativeLayout.LayoutParams(getDPI(300, metrics),getDPI(50, metrics)));
                    mDragView.setTag("box");
                    mCloseView.setVisibility(View.VISIBLE);
                    FloatingModule.mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("SHOW_BALLOON", false);
                } else {
                    mCollapseView.setLayoutParams(new RelativeLayout.LayoutParams(getDPI(80, metrics),getDPI(80, metrics)));
                    mDragView.setLayoutParams(new RelativeLayout.LayoutParams(getDPI(80, metrics),getDPI(80, metrics)));
                    mDragView.setTag("balloon");
                    mCloseView.setVisibility(View.GONE);
                    FloatingModule.mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("SHOW_BALLOON", true);
                }
            }
        });

        //Drag and move floating view using user's touch action.
        mFloatingView.findViewById(R.id.expanded_container).setOnTouchListener(new View.OnTouchListener() {
            private int initialX;
            private int initialY;
            private float initialTouchX;
            private float initialTouchY;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (mDragView.getVisibility() == View.GONE) return false;
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:

                        //remember the initial position.
                        initialX = params.x;
                        initialY = params.y;

                        //get the touch location
                        initialTouchX = event.getRawX();
                        initialTouchY = event.getRawY();
                        return true;
                    case MotionEvent.ACTION_UP:
                        int Xdiff = (int) (event.getRawX() - initialTouchX);
                        int Ydiff = (int) (event.getRawY() - initialTouchY);

                        //The check for Xdiff <10 && YDiff< 10 because sometime elements moves a little while clicking.
                        //So that is click event.
                        if (Xdiff < 10 && Ydiff < 10) {
                            mCollapseView.setLayoutParams(new RelativeLayout.LayoutParams(getDPI(300, metrics),getDPI(300, metrics)));
                            mDragView.setLayoutParams(new RelativeLayout.LayoutParams(getDPI(300, metrics),getDPI(50, metrics)));
                            mCloseView.setVisibility(View.VISIBLE);
                            FloatingModule.mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                    .emit("SHOW_BALLOON", false);
                        }
                        return true;
                    case MotionEvent.ACTION_MOVE:

                        //Calculate the X and Y coordinates of the view.
                        params.x = initialX + (int) (event.getRawX() - initialTouchX);
                        params.y = initialY + (int) (event.getRawY() - initialTouchY);

                        //Update the layout with new X & Y coordinate
                        mWindowManager.updateViewLayout(mFloatingView, params);
                        return true;
                }
                return false;
            }
        });
        Log.d("FLOATING_VIEW_SERVICE", "onCreate done");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(receiver);
        if (mFloatingView != null) mWindowManager.removeView(mFloatingView);
    }
}
