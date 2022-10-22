package com.gada;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;

import com.facebook.react.ReactActivity;
import com.gada.newarchitecture.NewWebViewClient;
import com.reactnativecommunity.webview.RNCWebViewManager;

import org.devio.rn.splashscreen.SplashScreen;


public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);

        RNCWebViewManager.RNCWebViewClient client = new NewWebViewClient();
        Log.e("pleasegaeun", "pleasegaeun");
        super.onCreate(savedInstanceState);
    }

    @Override
    protected String getMainComponentName() {
        return "GaDa";
    }


}
