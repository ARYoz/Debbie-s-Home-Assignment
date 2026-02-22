// Simple API Test Script
// This script demonstrates the firewall rules API functionality
// Run this after starting the server

const API_BASE = 'http://localhost:3000/api/firewall';

async function testAPI() {
    console.log('🧪 Testing Firewall Rules API...\n');

    try {
        // Test 1: Health Check
        console.log('1. Testing Health Check...');
        const healthResponse = await fetch(`${API_BASE}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health Check:', healthData);
        console.log('');

        // Test 2: Add IPs to Blacklist
        console.log('2. Adding IPs to Blacklist...');
        const addIPResponse = await fetch(`${API_BASE}/ip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                values: ['192.168.1.100', '10.0.0.50'],
                mode: 'blacklist'
            })
        });
        const addIPData = await addIPResponse.json();
        console.log(' Add IPs Response:', addIPData);
        console.log('');

        // Test 3: Add URLs to Whitelist
        console.log('3. Adding URLs to Whitelist...');
        const addURLResponse = await fetch(`${API_BASE}/url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                values: ['trusted-site.com', 'secure-api.com'],
                mode: 'whitelist'
            })
        });
        const addURLData = await addURLResponse.json();
        console.log('✅ Add URLs Response:', addURLData);
        console.log('');

        // Test 4: Add Ports to Blacklist
        console.log('4. Adding Ports to Blacklist...');
        const addPortResponse = await fetch(`${API_BASE}/port`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                values: [22, 23, 3389],
                mode: 'blacklist'
            })
        });
        const addPortData = await addPortResponse.json();
        console.log('✅ Add Ports Response:', addPortData);
        console.log('');

        // Test 5: Get All Rules
        console.log('5. Getting All Rules...');
        const getRulesResponse = await fetch(`${API_BASE}/rules`);
        const getRulesData = await getRulesResponse.json();
        console.log('✅ All Rules:', JSON.stringify(getRulesData, null, 2));
        console.log('');

        // Test 6: Toggle Rule Activation (if we have rules)
        if (getRulesData.ips && getRulesData.ips.blacklist.length > 0) {
            console.log('6. Toggling Rule Activation...');
            const toggleResponse = await fetch(`${API_BASE}/rules`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ips: {
                        ids: [getRulesData.ips.blacklist[0].id],
                        mode: 'blacklist',
                        active: false
                    }
                })
            });
            const toggleData = await toggleResponse.json();
            console.log('✅ Toggle Response:', toggleData);
            console.log('');
        }

        // Test 7: Remove some rules
        console.log('7. Removing some rules...');
        const removeIPResponse = await fetch(`${API_BASE}/ip`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                values: ['192.168.1.100'],
                mode: 'blacklist'
            })
        });
        const removeIPData = await removeIPResponse.json();
        console.log('✅ Remove IP Response:', removeIPData);
        console.log('');

        console.log('🎉 All tests completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n💡 Make sure the server is running on http://localhost:3000');
        console.log('💡 Run: npm run dev (or pnpm dev) to start the server');
    }
}

// Run the tests
testAPI();
