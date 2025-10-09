import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Debug endpoint to view all data
app.get("/make-server-382214ec/debug/all-data", async (c) => {
  try {
    // Get all keys from the database
    const freelancers = await kv.getByPrefix("freelancer:") || [];
    const clients = await kv.getByPrefix("client:") || [];
    const jobs = await kv.getByPrefix("job:") || [];
    const categoryData = await kv.getByPrefix("category_counts") || [];
    const featuredData = await kv.getByPrefix("featured_jobs") || [];
    const nextIdData = await kv.getByPrefix("next_id") || [];

    const allKeys = [
      ...freelancers,
      ...clients,
      ...jobs,
      ...categoryData,
      ...featuredData,
      ...nextIdData
    ];

    console.log("Debug: Raw data from database:", {
      freelancersCount: freelancers.length,
      clientsCount: clients.length,
      jobsCount: jobs.length,
      totalKeys: allKeys.length,
      sampleKey: allKeys[0]
    });

    const records = allKeys
      .filter(item => item && item.key) // Filter out invalid items
      .map(item => ({
        key: String(item.key || ''),
        value: item.value
      }));

    return c.json({ 
      records,
      totalCount: records.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.log("Error fetching all data:", error);
    console.log("Error details:", error);
    return c.json({ 
      error: "Failed to fetch database data",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Health check endpoint
app.get("/make-server-382214ec/health", (c) => {
  return c.json({ status: "ok" });
});

// Force create demo data (bypass existing check)
app.post("/make-server-382214ec/debug/force-demo-data", async (c) => {
  try {
    console.log("=== FORCE CREATING DEMO DATA ===");
    
    // Create demo freelancer
    const freelancerId = "FL000001";
    const freelancerData = {
      userId: freelancerId,
      name: "Demo Freelancer",
      email: "freelancer@demo.com",
      country: "india",
      skills: ["React", "Node.js", "JavaScript"],
      categories: ["Development & IT"],
      profile: {
        mobileNo: "9876543210",
        briefAbout: "Experienced web developer specializing in React and Node.js",
        experience: "3+ years",
        dateOfBirth: "1990-01-01",
        address: "Demo Address",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        panNo: "ABCDE1234F",
        aadhaarNo: "123456789012"
      },
      type: "freelancer",
      createdAt: new Date().toISOString(),
      status: "active"
    };
    
    console.log("Creating freelancer:", freelancerData);
    await kv.set(`freelancer:${freelancerId}`, freelancerData);
    
    // Create demo client
    const clientId = "CL000001";
    const clientData = {
      userId: clientId,
      name: "Demo Client",
      email: "client@demo.com",
      country: "india",
      companyName: "Demo Company",
      businessDescription: "Tech startup looking for talented developers",
      profile: {
        mobile: "9876543211",
        businessDescription: "Tech startup looking for talented developers",
        expertiseNeeded: "Web Development",
        address: "Demo Address",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001"
      },
      type: "client",
      createdAt: new Date().toISOString(),
      status: "active"
    };
    
    console.log("Creating client:", clientData);
    await kv.set(`client:${clientId}`, clientData);
    
    return c.json({ 
      success: true,
      message: "Demo data force created",
      demoAccounts: [
        { type: "freelancer", mobile: "9876543210", name: "Demo Freelancer" },
        { type: "client", mobile: "9876543211", name: "Demo Client" }
      ]
    });
  } catch (error) {
    console.log("Error force creating demo data:", error);
    return c.json({ error: "Failed to force create demo data", details: error.message }, 500);
  }
});

// Initialize demo data endpoint
app.post("/make-server-382214ec/debug/init-demo-data", async (c) => {
  try {
    console.log("=== DEMO DATA INITIALIZATION START ===");
    
    // Check if data already exists
    console.log("Checking for existing data...");
    const existingFreelancers = await kv.getByPrefix("freelancer:");
    const existingClients = await kv.getByPrefix("client:");
    
    console.log("Existing freelancers:", existingFreelancers?.length || 0);
    console.log("Existing clients:", existingClients?.length || 0);
    
    if (existingFreelancers && existingFreelancers.length > 0) {
      console.log("Demo data already exists - freelancers found");
      return c.json({ 
        message: "Demo data already exists - freelancers found",
        freelancers: existingFreelancers.length,
        clients: existingClients?.length || 0,
        existingFreelancerMobiles: existingFreelancers.map(f => f.value?.profile?.mobileNo || f.value?.profile?.mobile)
      });
    }
    
    if (existingClients && existingClients.length > 0) {
      console.log("Demo data already exists - clients found");
      return c.json({ 
        message: "Demo data already exists - clients found", 
        freelancers: existingFreelancers?.length || 0,
        clients: existingClients.length,
        existingClientMobiles: existingClients.map(c => c.value?.profile?.mobile || c.value?.profile?.mobileNo)
      });
    }
    
    // Create demo freelancer
    const freelancerId = "FL000001";
    const freelancerData = {
      userId: freelancerId,
      name: "Demo Freelancer",
      email: "freelancer@demo.com",
      country: "india",
      skills: ["React", "Node.js", "JavaScript"],
      categories: ["Development & IT"],
      profile: {
        mobileNo: "9876543210",
        briefAbout: "Experienced web developer specializing in React and Node.js",
        experience: "3+ years",
        dateOfBirth: "1990-01-01",
        address: "Demo Address",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        panNo: "ABCDE1234F",
        aadhaarNo: "123456789012"
      },
      type: "freelancer",
      createdAt: new Date().toISOString(),
      status: "active"
    };
    
    console.log("Creating freelancer with data:", freelancerData);
    await kv.set(`freelancer:${freelancerId}`, freelancerData);
    console.log("✅ Freelancer created successfully");
    
    // Add to category index
    const categoryKey = "category:Development & IT:freelancers";
    await kv.set(categoryKey, [freelancerId]);
    console.log("✅ Category index updated");
    
    // Create demo client
    const clientId = "CL000001";
    const clientData = {
      userId: clientId,
      name: "Demo Client",
      email: "client@demo.com",
      country: "india",
      companyName: "Demo Company",
      businessDescription: "Tech startup looking for talented developers",
      profile: {
        mobile: "9876543211",
        businessDescription: "Tech startup looking for talented developers",
        expertiseNeeded: "Web Development",
        address: "Demo Address",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001"
      },
      type: "client",
      createdAt: new Date().toISOString(),
      status: "active"
    };
    
    console.log("Creating client with data:", clientData);
    await kv.set(`client:${clientId}`, clientData);
    console.log("✅ Client created successfully");
    
    // Update next IDs
    await kv.set("next_id:freelancer", 2);
    await kv.set("next_id:client", 2);
    console.log("✅ Next IDs updated");
    
    // Verify the data was stored correctly
    console.log("=== VERIFICATION ===");
    const verifyFreelancer = await kv.get(`freelancer:${freelancerId}`);
    const verifyClient = await kv.get(`client:${clientId}`);
    
    console.log("Stored freelancer:", verifyFreelancer);
    console.log("Stored client:", verifyClient);
    console.log("=== DEMO DATA INITIALIZATION COMPLETE ===");
    
    return c.json({ 
      success: true,
      message: "Demo data created successfully",
      demoAccounts: [
        { type: "freelancer", mobile: "9876543210", name: "Demo Freelancer" },
        { type: "client", mobile: "9876543211", name: "Demo Client" }
      ]
    });
  } catch (error) {
    console.log("Error creating demo data:", error);
    return c.json({ error: "Failed to create demo data" }, 500);
  }
});

// Debug endpoint to check what mobile numbers exist
app.get("/make-server-382214ec/debug/mobile-check", async (c) => {
  try {
    const allMobiles = [];
    
    // Check freelancers
    const freelancers = await kv.getByPrefix("freelancer:");
    console.log("Found freelancers:", freelancers?.length || 0);
    
    if (freelancers) {
      for (const item of freelancers) {
        const profile = item.value;
        allMobiles.push({
          type: "freelancer",
          key: item.key,
          name: profile?.name,
          mobile: profile?.profile?.mobileNo || profile?.profile?.mobile,
          profileKeys: profile?.profile ? Object.keys(profile.profile) : []
        });
      }
    }
    
    // Check clients
    const clients = await kv.getByPrefix("client:");
    console.log("Found clients:", clients?.length || 0);
    
    if (clients) {
      for (const item of clients) {
        const profile = item.value;
        allMobiles.push({
          type: "client",
          key: item.key,
          name: profile?.name,
          mobile: profile?.profile?.mobile || profile?.profile?.mobileNo,
          profileKeys: profile?.profile ? Object.keys(profile.profile) : []
        });
      }
    }
    
    return c.json({ 
      allMobiles,
      totalUsers: allMobiles.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.log("Error checking mobiles:", error);
    return c.json({ error: "Failed to check mobiles" }, 500);
  }
});

// Freelancer Profile Routes
app.post("/make-server-382214ec/freelancers", async (c) => {
  try {
    const data = await c.req.json();
    const { userId, name, email, country, skills, categories, profile } = data;
    
    // Store freelancer profile
    const freelancerKey = `freelancer:${userId}`;
    await kv.set(freelancerKey, {
      userId,
      name,
      email,
      country,
      skills,
      categories,
      profile,
      type: "freelancer",
      createdAt: new Date().toISOString(),
      status: "active"
    });
    
    // Store in category indexes for quick lookup
    for (const category of categories) {
      const categoryKey = `category:${category}:freelancers`;
      const existing = await kv.get(categoryKey) || [];
      if (!existing.includes(userId)) {
        existing.push(userId);
        await kv.set(categoryKey, existing);
      }
    }
    
    return c.json({ success: true, message: "Freelancer profile created successfully" });
  } catch (error) {
    console.log("Error creating freelancer profile:", error);
    return c.json({ error: "Failed to create freelancer profile" }, 500);
  }
});

app.get("/make-server-382214ec/freelancers/categories", async (c) => {
  try {
    const categories = [
      "Development & IT",
      "Design & Creative", 
      "Sales & Marketing",
      "Writing & Translation",
      "Admin & Customer Support",
      "Finance & Accounting",
      "Engineering & Architecture",
      "Legal"
    ];
    
    const categoryCounts = {};
    
    for (const category of categories) {
      const categoryKey = `category:${category}:freelancers`;
      const freelancers = await kv.get(categoryKey) || [];
      categoryCounts[category] = freelancers.length;
    }
    
    return c.json({ categories: categoryCounts });
  } catch (error) {
    console.log("Error fetching category counts:", error);
    return c.json({ error: "Failed to fetch category counts" }, 500);
  }
});

// Job Posting Routes
app.post("/make-server-382214ec/jobs", async (c) => {
  try {
    const data = await c.req.json();
    const { 
      jobId,
      clientId, 
      title, 
      description, 
      budget, 
      timeline, 
      skillsRequired, 
      category,
      location,
      paymentType 
    } = data;
    
    // Use provided jobId or generate one if not provided (for backward compatibility)
    const finalJobId = jobId || `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const jobKey = `job:${finalJobId}`;
    
    const jobData = {
      jobId: finalJobId,
      clientId,
      title,
      description,
      budget,
      timeline,
      skillsRequired,
      category,
      location,
      paymentType,
      status: "active",
      postedAt: new Date().toISOString(),
      applicants: []
    };
    
    await kv.set(jobKey, jobData);
    
    // Add to featured jobs list
    const featuredKey = "featured_jobs";
    const featuredJobs = await kv.get(featuredKey) || [];
    featuredJobs.unshift(finalJobId); // Add to beginning
    // Keep only latest 20 featured jobs
    if (featuredJobs.length > 20) {
      featuredJobs.splice(20);
    }
    await kv.set(featuredKey, featuredJobs);
    
    return c.json({ success: true, jobId: finalJobId, message: "Job posted successfully" });
  } catch (error) {
    console.log("Error posting job:", error);
    return c.json({ error: "Failed to post job" }, 500);
  }
});

app.get("/make-server-382214ec/jobs/featured", async (c) => {
  try {
    const featuredKey = "featured_jobs";
    const featuredJobIds = await kv.get(featuredKey) || [];
    
    const jobs = [];
    for (const jobId of featuredJobIds.slice(0, 10)) { // Get latest 10
      const jobData = await kv.get(`job:${jobId}`);
      if (jobData && jobData.status === "active") {
        jobs.push(jobData);
      }
    }
    
    return c.json({ jobs });
  } catch (error) {
    console.log("Error fetching featured jobs:", error);
    return c.json({ error: "Failed to fetch featured jobs" }, 500);
  }
});

app.get("/make-server-382214ec/jobs/client/:clientId", async (c) => {
  try {
    const clientId = c.req.param("clientId");
    const jobKeys = await kv.getByPrefix("job:");
    
    const clientJobs = [];
    for (const key of jobKeys) {
      const jobData = key.value;
      if (jobData.clientId === clientId) {
        clientJobs.push(jobData);
      }
    }
    
    // Sort by posted date (newest first)
    clientJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    
    return c.json({ jobs: clientJobs });
  } catch (error) {
    console.log("Error fetching client jobs:", error);
    return c.json({ error: "Failed to fetch client jobs" }, 500);
  }
});

// Authentication Routes
app.post("/make-server-382214ec/auth/login", async (c) => {
  try {
    console.log("=== LOGIN REQUEST START ===");
    const requestBody = await c.req.json();
    console.log("Request body:", requestBody);
    
    const { mobileNumber, password } = requestBody;
    
    if (!mobileNumber) {
      console.log("ERROR: No mobile number provided");
      return c.json({ error: "Mobile number is required" }, 400);
    }
    
    console.log("Login attempt for mobile:", mobileNumber);
    
    // Search for user in both freelancer and client databases
    let userData = null;
    let userType = null;
    
    // Check freelancers first
    const freelancerKeys = await kv.getByPrefix("freelancer:");
    console.log("Found freelancer keys:", freelancerKeys?.length || 0);
    
    if (freelancerKeys && freelancerKeys.length > 0) {
      for (const item of freelancerKeys) {
        const profile = item.value;
        console.log("Checking freelancer profile:", {
          key: item.key,
          userId: profile?.userId,
          name: profile?.name,
          mobileNo: profile?.profile?.mobileNo,
          mobile: profile?.profile?.mobile,
          allProfileKeys: profile?.profile ? Object.keys(profile.profile) : 'no profile'
        });
        
        const profileMobile = profile?.profile?.mobileNo || profile?.profile?.mobile;
        if (profileMobile === mobileNumber) {
          userData = profile;
          userType = "freelancer";
          console.log("✅ Found matching freelancer:", {
            name: userData.name,
            userId: userData.userId,
            mobile: profileMobile
          });
          break;
        }
      }
    }
    
    // If not found in freelancers, check clients
    if (!userData) {
      const clientKeys = await kv.getByPrefix("client:");
      console.log("Found client keys:", clientKeys?.length || 0);
      
      if (clientKeys && clientKeys.length > 0) {
        for (const item of clientKeys) {
          const profile = item.value;
          console.log("Checking client profile:", {
            key: item.key,
            userId: profile?.userId,
            name: profile?.name,
            mobile: profile?.profile?.mobile,
            mobileNo: profile?.profile?.mobileNo,
            allProfileKeys: profile?.profile ? Object.keys(profile.profile) : 'no profile'
          });
          
          const profileMobile = profile?.profile?.mobile || profile?.profile?.mobileNo;
          if (profileMobile === mobileNumber) {
            userData = profile;
            userType = "client";
            console.log("✅ Found matching client:", {
              name: userData.name,
              userId: userData.userId,
              mobile: profileMobile
            });
            break;
          }
        }
      }
    }
    
    if (!userData) {
      console.log("❌ User not found with mobile number:", mobileNumber);
      console.log("Available freelancer mobiles:", 
        freelancerKeys?.map(k => k.value?.profile?.mobileNo || k.value?.profile?.mobile).filter(Boolean) || []
      );
      console.log("Available client mobiles:", 
        (await kv.getByPrefix("client:"))?.map(k => k.value?.profile?.mobile || k.value?.profile?.mobileNo).filter(Boolean) || []
      );
      return c.json({ 
        error: "User not found with this mobile number",
        success: false
      }, 404);
    }
    
    // In a real app, you would verify password here
    // For now, we'll simulate successful login if user exists
    console.log("✅ Login successful for user:", {
      name: userData.name,
      type: userType,
      userId: userData.userId
    });
    
    const response = { 
      success: true, 
      user: {
        id: userData.userId,
        name: userData.name,
        email: userData.email,
        mobileNumber: userData.profile?.mobileNo || userData.profile?.mobile || mobileNumber,
        country: userData.country,
        userType: userType,
        profileComplete: true,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100`
      }
    };
    
    console.log("Sending response:", response);
    console.log("=== LOGIN REQUEST END ===");
    
    return c.json(response);
  } catch (error) {
    console.log("❌ LOGIN ERROR - FULL DETAILS:");
    console.log("Error type:", typeof error);
    console.log("Error constructor:", error?.constructor?.name);
    console.log("Error message:", error instanceof Error ? error.message : String(error));
    console.log("Error stack:", error instanceof Error ? error.stack : 'No stack available');
    console.log("Full error object:", error);
    console.log("=== LOGIN ERROR END ===");
    
    return c.json({ 
      success: false,
      error: "Login failed - server error",
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Check if mobile number exists (for registration validation)
app.post("/make-server-382214ec/auth/check-mobile", async (c) => {
  try {
    const { mobileNumber } = await c.req.json();
    
    if (!mobileNumber) {
      return c.json({ error: "Mobile number is required" }, 400);
    }
    
    // Search for user in both freelancer and client databases
    let userExists = false;
    let userType = null;
    
    // Check freelancers
    const freelancerKeys = await kv.getByPrefix("freelancer:");
    for (const key of freelancerKeys) {
      const profile = key.value;
      if (profile.profile?.mobileNo === mobileNumber || 
          profile.profile?.mobile === mobileNumber) {
        userExists = true;
        userType = "freelancer";
        break;
      }
    }
    
    // Check clients if not found in freelancers
    if (!userExists) {
      const clientKeys = await kv.getByPrefix("client:");
      for (const key of clientKeys) {
        const profile = key.value;
        if (profile.profile?.mobile === mobileNumber || 
            profile.profile?.mobileNo === mobileNumber) {
          userExists = true;
          userType = "client";
          break;
        }
      }
    }
    
    return c.json({ 
      exists: userExists,
      userType: userType
    });
  } catch (error) {
    console.log("Check mobile error:", error);
    return c.json({ error: "Failed to check mobile number" }, 500);
  }
});

// Client Profile Routes
app.post("/make-server-382214ec/clients", async (c) => {
  try {
    const data = await c.req.json();
    const { userId, name, email, country, companyName, businessDescription, profile } = data;
    
    // Store client profile
    const clientKey = `client:${userId}`;
    await kv.set(clientKey, {
      userId,
      name,
      email,
      country,
      companyName,
      businessDescription,
      profile,
      type: "client",
      createdAt: new Date().toISOString(),
      status: "active"
    });
    
    return c.json({ success: true, message: "Client profile created successfully" });
  } catch (error) {
    console.log("Error creating client profile:", error);
    return c.json({ error: "Failed to create client profile" }, 500);
  }
});

Deno.serve(app.fetch);