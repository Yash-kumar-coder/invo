import { useState } from "react";
import axios from "axios";
import { UploadCloud, Download, Plus, Trash2 } from "lucide-react";

export default function App() {
  const [formData, setFormData] = useState({
    companyLogo: "",
    companyName: "Madneshwarlogistic",
    companyAddress: "OFFICE NO. 9A, PLOT NO.\nB-9, ITL TWIN\nTOWER,NETAJI SUBHASH\nPLACE, PITAMPURA, New\nDelhi, NorthWest Delhi,\nDelhi, 110034",
    companyGstin: "07AGZPA3160A2ZO",
    barcodeNumber: "20001681862",
    bookingId: "XPBL/1084161",
    orderId: "XPL/1513792",
    shippingDate: "14-04-2026",
    customerName: "PD Logistics",
    originGateway: "GURGAON",
    destinationGateway: "LUCKNOW",
    typeOfService: "LCL Express",
    origin: "Alipur (NDA)",
    destination: "LUCKNOW (NDA)",
    customerDoc: "",
    shipperGstin: "07AAGCA5456M1ZB",
    shipperName: "Keya Foods International Pvt Ltd",
    shipperCity: "DELHI",
    shipperPin: "110036",
    shipperAddress: "Extended Lal Dora,, Village Alipur, Delhi, 110036",
    receiverGstin: "09BCEPG9965R2ZI",
    receiverName: "SHIV SHAKTI ENTERPRISES",
    receiverPin: "226010",
    receiverMobile: "",
    receiverAddress: "E 2/739, VINAY KHAND,, , Lucknow,, 226010",
    invoiceNoDate: "1126100077/14-04-2026",
    ewaybillDetails: "731624799394 (Regular)",
    totalValue: "96803",
    goodsDescriptions: "",
    quantityPieces: "48",
    packagesBoxes: "48",
    transitRisk: "Owners Risk",
    freightMode: "Credit",
    vas: "No",
    actualWeight: "400",
    volumetricWeight: "327",
    chargedWeight: "400",
    lbhRows: [
      { l: "12", b: "18", h: "6", pkgs: "14", vwt: "63.00" },
      { l: "15", b: "19", h: "6", pkgs: "1", vwt: "6.00" },
      { l: "12", b: "16", h: "6", pkgs: "6", vwt: "24.00" },
    ],
    totalPkgs: "48",
    totalVwt: "327.00",
    specialRemarks: "",
    generatedBy: "Lalit Chaudhary",
    generatedDate: "14-04-2026 05:44 PM",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, companyLogo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addLbhRow = () => {
    setFormData((prev) => ({
      ...prev,
      lbhRows: [...prev.lbhRows, { l: "", b: "", h: "", pkgs: "", vwt: "" }],
    }));
  };

  const updateLbhRow = (index: number, field: string, value: string) => {
    const newRows = [...formData.lbhRows];
    newRows[index] = { ...newRows[index], [field]: value };
    setFormData((prev) => ({ ...prev, lbhRows: newRows }));
  };

  const removeLbhRow = (index: number) => {
    const newRows = formData.lbhRows.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, lbhRows: newRows }));
  };

  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      const response = await axios.post("http://localhost:5000/api/generate-pdf", formData, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "consignment-note.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to generate PDF. Is the backend running on port 5000?");
    } finally {
      setIsGenerating(false);
    }
  };

  // The Exact HTML/CSS embedded dynamically
  const PreviewHTML = () => (
    <div className="preview-container scale-[0.8] origin-top max-w-[800px] w-[800px] bg-white border-2 border-black mb-1 mx-auto text-[#111] font-sans text-[11px]">
      <style dangerouslySetInnerHTML={{__html: `
        .consignment-note * { margin: 0; padding: 0; box-sizing: border-box; }
        .consignment-note .section { border-bottom: 2px solid #000; }
        .consignment-note .section:last-child { border-bottom: none; }
        .consignment-note .flex-row { display: flex; width: 100%; }
        .consignment-note .flex-column { display: flex; flex-direction: column; justify-content: space-between; }
        .consignment-note .flex-column-end { display: flex; flex-direction: column; justify-content: flex-end; }
        .consignment-note .space-between { display: flex; justify-content: space-between; }
        .consignment-note .half-width { width: 50%; }
        .consignment-note .border-right { border-right: 2px solid #000; }
        .consignment-note .border-bottom { border-bottom: 2px solid #000; }
        .consignment-note .padding-small { padding: 4px 6px; }
        .consignment-note .text-center { text-align: center; }
        .consignment-note .text-right { text-align: right; margin-top: 4px; }
        .consignment-note .text-small { font-size: 10px; line-height: 1.3; }
        .consignment-note .font-bold { font-weight: bold; }
        .consignment-note .background-light { background-color: #aeb2b5; }
        .consignment-note .company-details { width: 30%; padding: 10px; text-align: center; }
        .consignment-note .logo-container { display: flex; justify-content: center; margin-bottom: 5px; }
        .consignment-note .company-logo-img { width: 130px; height: auto; max-width: 100%; display: block; object-fit: contain; border-radius: 4px; }
        .consignment-note .company-name { font-weight: bold; margin-bottom: 8px; }
        .consignment-note .company-address, .consignment-note .gstin { font-size: 10px; line-height: 1.4; margin-bottom: 10px; }
        .consignment-note .note-details { width: 70%; padding: 10px 0 0 0; }
        .consignment-note .note-title { text-align: center; font-size: 14px; margin-bottom: 5px; color: #000; }
        .consignment-note .barcode-container { text-align: center; margin-bottom: 10px; }
        .consignment-note .barcode { width: 250px; height: 35px; display: block; margin: 0 auto; }
        .consignment-note .barcode-number { font-size: 9px; font-weight: bold; margin-top: 2px; }
        .consignment-note .grid-details { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 2px solid #000; }
        .consignment-note .grid-details > div { padding: 4px 6px; line-height: 1.4; }
        .consignment-note .full-width { grid-column: span 3; }
        .consignment-note .address-box { line-height: 1.4; min-height: 110px; }
        .consignment-note .grid-4 { display: grid; grid-template-columns: 2fr 1fr 1.5fr 1.5fr; }
        .consignment-note .weight-empty { width: 25%; }
        .consignment-note .lbh-details { width: 75%; line-height: 1.3; }
        .consignment-note .lbh-empty { width: 25%; }
        .consignment-note .pod-header { background-color: #c9ce00; border-bottom: 2px solid #000; padding: 4px; font-size: 12px; }
        .consignment-note .pod-signature-area { min-height: 80px; }
        .consignment-note .signature-line { margin-bottom: 8px; }
        .preview-footer { width: 100%; max-width: 800px; font-size: 10px; line-height: 1.5; margin: 0 auto; }
      `}} />

      <div className="consignment-note">
          <div className="section flex-row">
              <div className="company-details border-right">
                  <div className="logo-container">
                      <img src={formData.companyLogo || "/placeholder.png"} alt="Company Logo" className="company-logo-img" style={{display: formData.companyLogo ? 'block' : 'none'}} />
                  </div>
                  <div className="company-name">{formData.companyName}</div>
                  <div className="company-address" dangerouslySetInnerHTML={{__html: formData.companyAddress.replace(/\\n/g, '<br>')}} />
                  <div className="gstin">
                      GSTIN :<br/>{formData.companyGstin}
                  </div>
              </div>

              <div className="note-details">
                  <h2 className="note-title">Goods Consignment Note ({formData.barcodeNumber})</h2>
                  <div className="barcode-container">
                      <svg className="barcode" viewBox="0 0 300 50" preserveAspectRatio="none">
                          <rect x="10" y="0" width="4" height="40" fill="black"></rect>
                          <rect x="18" y="0" width="8" height="40" fill="black"></rect>
                          <rect x="30" y="0" width="2" height="40" fill="black"></rect>
                          <rect x="36" y="0" width="10" height="40" fill="black"></rect>
                          <rect x="50" y="0" width="6" height="40" fill="black"></rect>
                          <rect x="60" y="0" width="4" height="40" fill="black"></rect>
                          <rect x="68" y="0" width="12" height="40" fill="black"></rect>
                          <rect x="84" y="0" width="4" height="40" fill="black"></rect>
                          <rect x="92" y="0" width="8" height="40" fill="black"></rect>
                          <rect x="104" y="0" width="2" height="40" fill="black"></rect>
                          <rect x="110" y="0" width="10" height="40" fill="black"></rect>
                          <rect x="124" y="0" width="6" height="40" fill="black"></rect>
                          <rect x="134" y="0" width="4" height="40" fill="black"></rect>
                          <rect x="142" y="0" width="12" height="40" fill="black"></rect>
                          <rect x="158" y="0" width="4" height="40" fill="black"></rect>
                          <rect x="166" y="0" width="8" height="40" fill="black"></rect>
                          <rect x="178" y="0" width="2" height="40" fill="black"></rect>
                          <rect x="184" y="0" width="10" height="40" fill="black"></rect>
                          <rect x="198" y="0" width="6" height="40" fill="black"></rect>
                          <rect x="208" y="0" width="4" height="40" fill="black"></rect>
                          <rect x="216" y="0" width="12" height="40" fill="black"></rect>
                          <rect x="232" y="0" width="4" height="40" fill="black"></rect>
                          <rect x="240" y="0" width="8" height="40" fill="black"></rect>
                          <rect x="252" y="0" width="2" height="40" fill="black"></rect>
                          <rect x="258" y="0" width="10" height="40" fill="black"></rect>
                          <rect x="272" y="0" width="6" height="40" fill="black"></rect>
                          <rect x="282" y="0" width="8" height="40" fill="black"></rect>
                      </svg>
                      <div className="barcode-number">{formData.barcodeNumber}</div>
                  </div>

                  <div className="grid-details">
                      <div><strong>Booking ID:</strong><br/>{formData.bookingId}</div>
                      <div><strong>Order ID:</strong><br/>{formData.orderId}</div>
                      <div><strong>Shipping Date:</strong><br/>{formData.shippingDate}</div>
                      <div><strong>Customer Name:</strong><br/>{formData.customerName}</div>
                      <div><strong>Origin Gateway:</strong><br/>{formData.originGateway}</div>
                      <div><strong>Destination Gateway:</strong><br/>{formData.destinationGateway}</div>
                      <div><strong>Type of Service:</strong><br/>{formData.typeOfService}</div>
                      <div><strong>Origin:</strong><br/>{formData.origin}</div>
                      <div><strong>Destination:</strong><br/>{formData.destination}</div>
                      <div className="full-width"><strong>Customer DOC/LR/PO/ASN:</strong> {formData.customerDoc}</div>
                  </div>
              </div>
          </div>

          <div className="section flex-row text-center font-bold background-light">
              <div className="half-width border-right padding-small">Consignor/Shipper Details</div>
              <div className="half-width padding-small">Consignee/Receiver Details</div>
          </div>

          <div className="section flex-row">
              <div className="half-width border-right padding-small address-box">
                  GSTIN: {formData.shipperGstin}<br/>
                  {formData.shipperName}<br/>
                  {formData.shipperCity}<br/>
                  {formData.shipperPin}<br/><br/>
                  ::Dispatch From::<br/>
                  {formData.shipperAddress}
              </div>
              <div className="half-width padding-small address-box">
                  GSTIN: {formData.receiverGstin}<br/>
                  {formData.receiverName}<br/>
                  {formData.receiverPin}<br/>
                  Mobile No: {formData.receiverMobile}<br/><br/>
                  ::Ship To::<br/>
                  {formData.receiverAddress}
              </div>
          </div>

          <div className="section flex-row">
              <div className="half-width border-right padding-small">
                  <strong>Invoice/STN No. & Date:</strong><br/>
                  {formData.invoiceNoDate}
              </div>
              <div className="half-width padding-small">
                  <strong>Ewaybill Details:</strong><br/>
                  {formData.ewaybillDetails}
              </div>
          </div>

          <div className="section grid-4 border-bottom">
              <div className="border-right padding-small">
                  <strong>Total Value of Invoice/STN:</strong><br/>{formData.totalValue}
              </div>
              <div className="border-right padding-small">
                  <strong>Goods Descriptions:</strong><br/>{formData.goodsDescriptions || <>&nbsp;</>}
              </div>
              <div className="border-right padding-small">
                  <strong>Quantity/Pieces:</strong><br/>{formData.quantityPieces}
              </div>
              <div className="padding-small">
                  <strong>Packages/Boxes:</strong><br/>{formData.packagesBoxes}
              </div>
          </div>

          <div className="section grid-4 border-bottom">
              <div className="border-right padding-small">
                  <strong>Transit Risk:</strong><br/>{formData.transitRisk}
              </div>
              <div className="border-right padding-small">
                  <strong>Freight Mode:</strong><br/>{formData.freightMode}
              </div>
              <div className="border-right padding-small">
                  <strong>VAS:</strong><br/>{formData.vas}
              </div>
              <div className="padding-small"></div>
          </div>

          <div className="section flex-row grid-4">
              <div className="weight-col border-right padding-small">
                  <strong>Actual Weight:</strong><br/>{formData.actualWeight}
              </div>
              <div className="weight-col border-right padding-small">
                  <strong>Volumetric Weight:</strong><br/>{formData.volumetricWeight}
              </div>
              <div className="weight-col border-right padding-small">
                  <strong>Charged Weight:</strong><br/>{formData.chargedWeight}
              </div>
              <div className="weight-empty"></div>
          </div>

          <div className="section flex-row">
              <div className="lbh-details border-right padding-small">
                  <strong>LBH(Inch) | PKGS | V.WT:</strong><br/>
                  {formData.lbhRows.map((row, i) => (
                    <span key={i}>{row.l} X {row.b} X {row.h} | {row.pkgs} | {row.vwt},<br/></span>
                  ))}
                  <strong>Total:</strong> {formData.totalPkgs} | {formData.totalVwt}
              </div>
              <div className="lbh-empty"></div>
          </div>

          <div className="section padding-small border-bottom">
              <strong>Special Remarks:</strong> {formData.specialRemarks}
          </div>

          <div className="section padding-small text-small border-bottom">
              Declaration: On behalf of my organisation, I certify that the above information mentioned in the GCN is correct as per my knowledge and I undertake to make the Freight payment for this Order Id/GCN as per the terms & conditions of GCN and contractual agreement.<br/>
              <div className="text-right">{formData.shipperName}</div>
          </div>

          <div className="section padding-small text-small">
              Terms & Conditions: This is a Non-Negotiable Goods Consignment Note. It is agreed that the goods described here in are accepted in "Said to Contain" basis as per the invoices/STNs and Ewaybills. The onus of proper documentation with respect to GST, GSTIN & Ewaybill, Excise Duty, Customs and any statutory laws lies with the parties i.e. Consignor and Consignee. PD Logistics shall not be responsible/ Liable in any case of deficiency in the documents/ Statutory requirements.<br/>
              Carrying terms and liabilities are as per the contractual agreement.
          </div>

          <div className="pod-header text-center font-bold">
              PROOF OF DELIVERY (POD)
          </div>
          <div className="section padding-small text-center text-small border-bottom background-light">
              Goods and Documents received in full and intact condition
          </div>

          <div className="section flex-row pod-signature-area">
              <div className="half-width border-right padding-small flex-column">
                  <div className="signature-line"><strong>Name:</strong></div>
                  <div className="signature-line"><strong>Mobile No:</strong></div>
                  <div className="signature-line"><strong>Date & Time:</strong></div>
                  <div className="signature-line space-between">
                      <span><strong>Lat, Lng:</strong></span>
                      <span style={{position: 'relative', right: '90px'}}><strong>Place:</strong></span>
                  </div>
              </div>
              <div className="half-width padding-small flex-column-end">
                  <div><strong>Sign & Stamp:</strong></div>
              </div>
          </div>
      </div>

      <div className="preview-footer">
          <strong>Generated By:</strong> {formData.generatedBy} | {formData.generatedDate}<br/>
          <strong>*This is a computer generated document and does not require a signature</strong>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">ConsignmentNote</h1>
        </div>
        <button
          onClick={downloadPDF}
          disabled={isGenerating}
          className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {isGenerating ? (
             <span className="animate-pulse">Generating PDF...</span>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </>
          )}
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Form */}
        <div className="w-1/2 overflow-y-auto p-8 border-r bg-white custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-10">
            
            {/* Section 1: Company Details */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Company Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 transition-colors">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                  <input type="text" name="companyGstin" value={formData.companyGstin} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
              </div>
            </section>

            {/* Section 2: Consignment Details */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Consignment Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barcode Number</label>
                  <input type="text" name="barcodeNumber" value={formData.barcodeNumber} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Booking ID</label>
                  <input type="text" name="bookingId" value={formData.bookingId} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <input type="text" name="orderId" value={formData.orderId} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Date</label>
                  <input type="text" name="shippingDate" value={formData.shippingDate} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of Service</label>
                  <input type="text" name="typeOfService" value={formData.typeOfService} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin Gateway</label>
                  <input type="text" name="originGateway" value={formData.originGateway} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination Gateway</label>
                  <input type="text" name="destinationGateway" value={formData.destinationGateway} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                  <input type="text" name="origin" value={formData.origin} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer DOC/LR/PO/ASN</label>
                  <input type="text" name="customerDoc" value={formData.customerDoc} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
              </div>
            </section>

            {/* Section 3: Shipper & Receiver Details */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Shipper & Receiver Details</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Shipper */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 text-sm">Shipper Details</h3>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Name</label>
                    <input type="text" name="shipperName" value={formData.shipperName} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">GSTIN</label>
                    <input type="text" name="shipperGstin" value={formData.shipperGstin} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">City</label>
                    <input type="text" name="shipperCity" value={formData.shipperCity} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">PIN</label>
                    <input type="text" name="shipperPin" value={formData.shipperPin} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Address</label>
                    <textarea name="shipperAddress" value={formData.shipperAddress} onChange={handleInputChange} rows={2} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                </div>
                {/* Receiver */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 text-sm">Receiver Details</h3>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Name</label>
                    <input type="text" name="receiverName" value={formData.receiverName} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">GSTIN</label>
                    <input type="text" name="receiverGstin" value={formData.receiverGstin} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">PIN</label>
                    <input type="text" name="receiverPin" value={formData.receiverPin} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Mobile No</label>
                    <input type="text" name="receiverMobile" value={formData.receiverMobile} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Address</label>
                    <textarea name="receiverAddress" value={formData.receiverAddress} onChange={handleInputChange} rows={2} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                  </div>
                </div>
              </div>
            </section>

             {/* Section 4: Document & Package Details */}
             <section>
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Document & Package Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice/STN No & Date</label>
                  <input type="text" name="invoiceNoDate" value={formData.invoiceNoDate} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ewaybill Details</label>
                  <input type="text" name="ewaybillDetails" value={formData.ewaybillDetails} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Value</label>
                  <input type="text" name="totalValue" value={formData.totalValue} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goods Descriptions</label>
                  <input type="text" name="goodsDescriptions" value={formData.goodsDescriptions} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity/Pieces</label>
                  <input type="text" name="quantityPieces" value={formData.quantityPieces} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Packages/Boxes</label>
                  <input type="text" name="packagesBoxes" value={formData.packagesBoxes} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
              </div>
            </section>

             {/* Section 5: Weights */}
             <section>
              <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Weights</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Actual Weight</label>
                  <input type="text" name="actualWeight" value={formData.actualWeight} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Volumetric Weight</label>
                  <input type="text" name="volumetricWeight" value={formData.volumetricWeight} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Charged Weight</label>
                  <input type="text" name="chargedWeight" value={formData.chargedWeight} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
              </div>
            </section>

            {/* Section 6: LBH details */}
            <section>
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-lg font-medium text-gray-900">LBH Details</h2>
                <button onClick={addLbhRow} className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                  <Plus className="w-4 h-4 mr-1" /> Add Row
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.lbhRows.map((row, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input type="text" placeholder="L" value={row.l} onChange={(e) => updateLbhRow(index, 'l', e.target.value)} className="w-16 border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                    <span className="text-gray-400">×</span>
                    <input type="text" placeholder="B" value={row.b} onChange={(e) => updateLbhRow(index, 'b', e.target.value)} className="w-16 border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                    <span className="text-gray-400">×</span>
                    <input type="text" placeholder="H" value={row.h} onChange={(e) => updateLbhRow(index, 'h', e.target.value)} className="w-16 border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                    <span className="text-gray-400 ml-2">PKGS:</span>
                    <input type="text" value={row.pkgs} onChange={(e) => updateLbhRow(index, 'pkgs', e.target.value)} className="w-16 border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                    <span className="text-gray-400 ml-2">V.WT:</span>
                    <input type="text" value={row.vwt} onChange={(e) => updateLbhRow(index, 'vwt', e.target.value)} className="w-20 border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
                    <button onClick={() => removeLbhRow(index)} className="text-red-500 hover:text-red-700 p-2 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total PKGS</label>
                  <input type="text" name="totalPkgs" value={formData.totalPkgs} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total V.WT</label>
                  <input type="text" name="totalVwt" value={formData.totalVwt} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-black focus:border-black" />
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="w-1/2 bg-[#ffffff] overflow-y-auto p-4 flex items-start justify-center custom-scrollbar">
          <PreviewHTML />
        </div>
      </div>
    </div>
  );
}
