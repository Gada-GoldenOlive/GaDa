package com.gada.newarchitecture

import android.net.http.SslError
import android.webkit.SslErrorHandler
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import com.reactnativecommunity.webview.RNCWebViewManager

class NewWebViewClient: RNCWebViewManager.RNCWebViewClient() {

    override fun onReceivedSslError(
        view: WebView?, handler: SslErrorHandler,
        error: SslError?
    ) {

    }
}