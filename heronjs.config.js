module.exports = {
    metrics: {
        identity: 'todo-service', // service identity
        exporter: {
            client: 'signoz', // zipkin || jaeger || signoz
            type: 'remote', // remote | console
        },
        endpoint: {
            // zipkin: {
            //     url: 'http://localhost:9411/api/v2/spans'
            // }
            signoz: {
                url: 'http://localhost:4317',
            },
        },
    },
};
