import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeContainer = () => {
    const [language, setLanguage] = useState("javascript");

    const codeExamples = {
        javascript: `import axios from 'axios';
            
const result = await axios.get('https://unified-pwds-identification/api/verification', {
  params: {
    apiKey: process.env.apiKey,
    uid: 1434534645654346545
  }
})
.then(res => console.log(res.data))
.catch(err => console.log(err));`,

        php: `<?php
use GuzzleHttp\\Client;

$client = new Client();

try {
    $response = $client->request('GET', 'https://unified-pwds-identification/api/verification', [
        'query' => [
            'apiKey' => getenv('apiKey'),
            'uid' => 1434534645654346545
        ]
    ]);
    
    $data = json_decode($response->getBody());
    print_r($data);
} catch (\\Exception $e) {
    echo $e->getMessage();
}`,

        csharp: `using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

class Program
{
    static async Task Main()
    {
        using (var client = new HttpClient())
        {
            try
            {
                var response = await client.GetAsync(
                    $"https://unified-pwds-identification/api/verification?apiKey={Environment.GetEnvironmentVariable("apiKey")}&uid=1434534645654346545");
                
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseBody);
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}`,

        java: `import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiClient {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        String apiKey = System.getenv("apiKey");
        String url = "https://unified-pwds-identification/api/verification?apiKey=" + apiKey + "&uid=1434534645654346545";
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .GET()
            .build();
            
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}`,
    };

    return (
        <div className="w-full">
            <div className="mb-4 flex space-x-2">
                <button
                    className={`px-3 py-1 text-sm rounded ${
                        language === "javascript"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setLanguage("javascript")}
                >
                    JavaScript
                </button>
                <button
                    className={`px-3 py-1 text-sm rounded ${
                        language === "php"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setLanguage("php")}
                >
                    PHP
                </button>
                <button
                    className={`px-3 py-1 text-sm rounded ${
                        language === "csharp"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setLanguage("csharp")}
                >
                    C#
                </button>
                <button
                    className={`px-3 py-1 text-sm rounded ${
                        language === "java"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setLanguage("java")}
                >
                    Java
                </button>
            </div>

            <SyntaxHighlighter
                language={language === "csharp" ? "csharp" : language}
                showLineNumbers={true}
                customStyle={{
                    padding: 10,
                    borderRadius: "10px",
                    margin: 0,
                    fontSize: "14px",
                }}
            >
                {codeExamples[language]}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeContainer;
